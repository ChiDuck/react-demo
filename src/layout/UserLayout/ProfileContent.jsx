import AppointmentsSection from "../../components/UserProfile/AppointmentsSection";

export default function ProfileContent(props) {
  return (
    <div style={{ overflowY: "hidden", height: "100%" }}>
      <h3>{props.tab}</h3>
      <AppointmentsSection data={props.data} />
    </div>
  );
}
