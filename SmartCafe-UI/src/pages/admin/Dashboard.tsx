import DashboardCard from "@/components/admin/DashboardCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-orange-500">
          Overview
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Dashboard
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          A cleaner operations view with stronger spacing and premium surface
          treatment.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Total Orders" value="120" />

        <DashboardCard title="Total Users" value="45" />

        <DashboardCard title="Products" value="30" />

        <DashboardCard title="Revenue" value="₹25,000" />
      </div>
    </div>
  );
};

export default Dashboard;
