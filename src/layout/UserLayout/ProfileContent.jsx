import AppointmentsSection from "../../components/UserProfile/AppointmentsSection";

export default function ProfileContent(props) {
  return (
    <>
      <h3 style={{ margin: "20px 0", fontSize: 22 }}>{props.tab}</h3>
      <div style={{ overflow: "auto" }}>
        <AppointmentsSection json={props.json} />
      </div>
    </>
  );
}
