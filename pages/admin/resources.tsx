import Layout from "@/components/layout";
import Resources from "@/components/resources";

const AdminResourcesPage = () => {
  return (
    <Layout
        isAdmin
    >
        <Resources
            isAdmin
        />
    </Layout>
  );
};

export default AdminResourcesPage;
