import React from 'react';

import ProjectGallery from "@/components/projectGallery";

import {NextPage} from "next";
import Layout from "@/components/layout";

const AdminProjectGalleryPage: NextPage = () => {
    return (
        <Layout
            isAdmin={true}
        >
            <ProjectGallery
                isAdmin={true}
            />
        </Layout>
    );
};

export default AdminProjectGalleryPage;
