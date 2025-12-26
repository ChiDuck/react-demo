import { useEffect, useReducer, useRef, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { bookingIcons } from "../../../assets/icons/icons";
import ConfirmStep from "../../../components/BookingSteps/ConfirmStep/ConfirmStep";
import ContactStep from "../../../components/BookingSteps/ContactStep/ContactStep";
import DateStep from "../../../components/BookingSteps/DateStep/DateStep";
import GuestStep from "../../../components/BookingSteps/GuestStep/GuestStep";
import PreferencesStep from "../../../components/BookingSteps/PreferencesStep/PreferencesStep";
import ServicesStep from "../../../components/BookingSteps/ServicesStep/ServicesStep";
import TimeStep from "../../../components/BookingSteps/TimeStep/TimeStep";
import { bookingItems } from "../../../components/IconSVG/navItems";
import { getSalonAPI } from "../../../config/apiCalls";
import "./BookingPage.scss";
import {
  BOOKING_STEPS,
  bookingReducer,
  buildSavePayload,
  initialState,
  saveBookingProgress,
} from "./bookingReducer";
import { useBookingCountdown } from "./useBookingCountdown";

function BookingHeader() {
  //   const star = (data.salonstar / 5) * 100;
  const star = 85;
  return (
    <div className="d-flex justify-content-between align-items-center booking-header">
      <div className="d-flex">
        <img src="#" alt="" />
        <div>
          <h2>BorrowTheMoney</h2>
          <img src="#" alt="" />
          <span>Verified by Owner</span>
        </div>
      </div>
      <div>
        <div className="d-flex">
          <div className="position-relative">
            <div
              className="position-absolute text-nowrap overflow-hidden"
              style={{ width: `${star}%` }}
            >
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <div>
              <i className="fa-solid fa-star" style={{ color: "#aaa" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#aaa" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#aaa" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#aaa" }}></i>
              <i className="fa-solid fa-star" style={{ color: "#aaa" }}></i>
            </div>
          </div>
          <strong className="ms-1">5.0</strong>
        </div>
        <span>(122 Reviews)</span>
      </div>
    </div>
  );
}

function Progressor({ curStep }) {
  return (
    <>
      <div className="progressor">
        {bookingItems.map((item, i) => {
          const Icon = bookingIcons[item.icon];
          return (
            <div key={i}>
              <div
                className={`step-icon ${
                  i + 1 == curStep ? "active" : i + 1 < curStep ? "done" : ""
                }`}
              >
                <Icon />
              </div>
            </div>
          );
        })}
        <div>
          <div style={{ width: `${(curStep - 1) * (100 / 6)}%` }}>
            <div></div>
          </div>
        </div>
      </div>
      <div className="step-name">
        {bookingItems.map((item, i) => (
          <div key={i} className={`${i + 1 <= curStep ? "active" : ""}`}>
            {i + 1} - {item.label}
          </div>
        ))}
      </div>
    </>
  );
}

function Countdown({ seconds }) {
  if (seconds <= 0) return null;

  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="text-center mt-2">
      <span>
        {min}:{sec.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

export default function BookingPage() {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const [confirm, setConfirm] = useState(false);
  const sessionRef = useRef(null);
  const remainingSeconds = useBookingCountdown(handleExpiredSession);
  const hasFetchedRef = useRef(false);
  const [expired, setExpired] = useState(false);
  const salonid = searchParams.get("salonid");
  const totalSrv = state.selectedService.reduce(
    (a, item) => a + item.quantity,
    0
  );

  async function fetchProgress() {
    return await getSalonAPI({
      s: "GetBookingProcess",
      salonid: salonid,
      key: sessionRef.current,
      token: true,
      cache: false,
    });
  }
  async function handleExpiredSession() {
    const res = fetchProgress();

    localStorage.removeItem("booking_expires_at");
    dispatch({ type: "RESET_BOOKING" });
    alert("time out bih");
  }

  useEffect(() => {
    if (!sessionRef.current) return;

    saveBookingProgress(
      buildSavePayload({
        salonid,
        state,
        sessionKey: sessionRef.current,
      })
    );

    async function refreshTimer() {
      const expiresAt = Date.now() + 300 * 1000;
      localStorage.setItem("booking_expires_at", expiresAt);
    }

    refreshTimer();

    // startStepTimer();
    // return () => clearTimeout(timerRef.current);
  }, [state.step]);

  useEffect(() => {
    let key = searchParams.get("key");

    if (!key) {
      key = crypto.randomUUID();
      searchParams.set("key", key);
      setSearchParams(searchParams, { replace: true });
      hasFetchedRef.current = true;
    } else {
      sessionRef.current = key;

      async function restoreBooking() {
        const res = fetchProgress();

        if (res.error !== "") {
          console.log(res.error);
          return;
        }
        if (!res.data) return;

        dispatch({
          type: "RESTORE_BOOKING",
          payload: res.data.content,
        });
      }
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;
      restoreBooking();
    }
  }, []);

  // function startStepTimer() {
  //   clearTimeout(timerRef.current);

  //   timerRef.current = setTimeout(() => {
  //     const res = fetchProgress();

  //     dispatch({ type: "RESET_BOOKING" });
  //     setExpired(true);
  //   }, 5 * 60 * 1000);
  // }

  const stepValidators = {
    [BOOKING_STEPS.guest]: () => true,

    [BOOKING_STEPS.services]: (state) => totalSrv >= state.guests,
    [BOOKING_STEPS.preferences]: () => true,

    [BOOKING_STEPS.date]: (state) => !!state.selectedDate,

    [BOOKING_STEPS.time]: (state) => !!state.selectedTime,

    [BOOKING_STEPS.contact]: (state) => {
      const parser = JSON.parse(state.inforUser);
      const cleaned = parser?.phone.replace(/\D/g, "");
      const testPhone = cleaned
        ? cleaned.length >= 9 && cleaned.length <= 12
        : false;
      const testMail =
        parser?.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parser?.email);
      return !!parser?.name && testPhone && testMail;
    },
  };

  function canProceed(step, state) {
    const valid = stepValidators[step];
    return valid ? valid(state) : true;
  }

  return (
    <div className="ms-auto me-auto container mt-4 mb-4">
      <BookingHeader />
      <div className="booking-content">
        <Progressor curStep={state.step} />
        <Countdown seconds={remainingSeconds} />
        <div className="step-content">
          {state.step === BOOKING_STEPS.guest && (
            <GuestStep
              state={state}
              dispatch={dispatch}
              maxGuest={data.data.techcount}
            />
          )}
          {state.step === BOOKING_STEPS.services && (
            <ServicesStep state={state} dispatch={dispatch} id={salonid} />
          )}
          {state.step === BOOKING_STEPS.preferences && (
            <PreferencesStep state={state} dispatch={dispatch} id={salonid} />
          )}
          {state.step === BOOKING_STEPS.date && (
            <DateStep
              state={state}
              dispatch={dispatch}
              timezone={data.data.timezone}
              key={sessionRef.current}
              sessionKey={sessionRef.current}
              id={salonid}
            />
          )}
          {state.step === BOOKING_STEPS.time && (
            <TimeStep
              state={state}
              dispatch={dispatch}
              timezone={data.data.timezone}
              key={sessionRef.current}
              sessionKey={sessionRef.current}
              id={salonid}
            />
          )}
          {state.step === BOOKING_STEPS.contact && (
            <ContactStep state={state} dispatch={dispatch} />
          )}
          {state.step === BOOKING_STEPS.confirm && (
            <ConfirmStep state={state} dispatch={dispatch} />
          )}
        </div>
        <div className="d-flex justify-content-between">
          <button
            disabled={state.step === 1}
            className="back-btn"
            onClick={() => dispatch({ type: "PREV_STEP" })}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <div>
            <span>{state.guests} </span>
            Guests
            <span> | {totalSrv} </span>
            Service
          </div>
          <button
            disabled={!canProceed(state.step, state)}
            onClick={() => dispatch({ type: "NEXT_STEP" })}
          >
            Next <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
