import React from "react";
import { Tabs } from "antd";
import PromoDetailForm from "../components/AddPromoDetailsForm";
import PromoDetailsTable from "../components/PromoDetailsTable";

const PromoDetails = () => {
  const tabItems = [
    {
      key: "1",
      label: "Add New",
      children: <PromoDetailForm />,
    },
    {
      key: "2",
      label: "View Promo",
      children: <PromoDetailsTable />,
    },
  ];

  return (
    <>
      <div className="bg-white p-5 shadow-md">
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    </>
  );
};
export default PromoDetails;
