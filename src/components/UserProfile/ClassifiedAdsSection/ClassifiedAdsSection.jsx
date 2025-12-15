import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AdCard from "./ClassifiedAds";
import css from "./ClassifiedAds.module.scss";
import ClassifiedAdsModal from "./ClassifiedAdsModal";

export default function ClassifiedAdsSection() {
  const data = useLoaderData();
  const [list0, setList0] = useState(data.ads1.data);
  const [list1, setList1] = useState(data.ads2.data);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(0);

  useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      <ClassifiedAdsModal open={open} setOpen={setOpen} />
      <div className={css.adsContainer}>
        <div className={css.addBtn}>
          <button onClick={() => setOpen(true)}>+ Add a Classified Ads</button>
        </div>
        <div className={css.switch}>
          <div className={type === 1 ? css.buysell : ""}>
            <div></div>
            <div>
              <div onClick={() => setType(0)}>
                <strong className={type === 0 ? css.white : ""}>
                  Salon Jobs Listing
                </strong>
              </div>
              <div onClick={() => setType(1)}>
                <strong className={type === 1 ? css.white : ""}>
                  Salon - Buy & Sell
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={css.grid}>
          {type === 0
            ? list0?.map((item) => <AdCard key={item.id} item={item} />)
            : list1?.map((item) => <AdCard key={item.id} item={item} />)}
        </div>
      </div>
    </>
  );
}
