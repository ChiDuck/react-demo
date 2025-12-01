import AppointmentsSection from "../../components/UserProfile/AppointmentsSection";

export default function ProfileContent({ tab }) {
  return (
    <div>
      <h3>{tab}</h3>
      <AppointmentsSection />
    </div>
  );
}
