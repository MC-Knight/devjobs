import Logo from "../../components/Logo";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-upper">
        <Logo />
      </div>

      <div className="dashboard-lower">
        <div className="dashboard-btn">
          <button>Add new Job</button>
        </div>

        <div className="dashboard-table">dashboard here</div>
      </div>
    </div>
  );
}

export default Dashboard;
