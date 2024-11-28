import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
  message,
  Radio,
} from "antd";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import img1 from "../assets/offer_img01.jpg";
import img2 from "../assets/offer_img04.jpg";
import img3 from "../assets/promooffer_img06.jpg";
import img4 from "../assets/offer_img03.jpg";
import img5 from "../assets/offer_img02.jpg";

const PromoDetailForm = () => {
  const [promos, setPromos] = useState([]);
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      await api.post("promo-detail", values);

      message.success("Promo created!");
      form.resetFields();
    } catch (error) {
      message.error(" Failed to create new promo");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/promo`);
      setPromos(data);
    };
    fetchData();
  }, []);

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFormSubmit}
      initialValues={{
        imageUrl: "assets/img/images/offer_img01.jpg", // Default selected image
        isActive: true, // Default for the switch
      }}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={3} maxLength={40} />
      </Form.Item>

      <Form.Item
        label="Please select space promo image"
        name="imageUrl"
        rules={[{ required: true, message: "Please select an image option" }]}
      >
        <Radio.Group>
          <Radio value={"assets/img/images/offer_img01.jpg"} key={img1}>
            <div className="">
              <img
                src={img1}
                alt="Option 1"
                className="object-contain"
                width={150}
                height={150}
              />
            </div>
          </Radio>
          <Radio value={"assets/img/images/offer_img04.jpg"} key={img2}>
            <div className="">
              <img
                src={img2}
                alt="Option 2"
                className="object-contain"
                width={150}
                height={150}
              />
            </div>
          </Radio>
          <Radio value={"assets/img/images/promooffer_img06.jpg"} key={img3}>
            <div className="">
              <img
                src={img3}
                alt="Option 3"
                className="object-contain"
                width={150}
                height={150}
              />
            </div>
          </Radio>
          <Radio value={"assets/img/images/offer_img03.jpg"} key={img4}>
            <div className="">
              <img
                src={img4}
                alt="Option 4"
                className="object-contain"
                width={150}
                height={150}
              />
            </div>
          </Radio>
          <Radio value={"assets/img/images/offer_img02.jpg"} key={img5}>
            <div className="">
              <img
                src={img5}
                alt="Option 5"
                className="object-contain"
                width={150}
                height={150}
              />
            </div>
          </Radio>
        </Radio.Group>
      </Form.Item>

      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            label="Starting price"
            name="price"
            rules={[
              { required: true, message: "Please enter a starting price" },
            ]}
          >
            <InputNumber size="large" min={0} style={{ width: "70%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select a promo type" }]}
          >
            <Select size="large">
              <Select.Option value="daily">Daily</Select.Option>
              <Select.Option value="weekly">Weekly</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Promo Code"
        name="promoCode"
        rules={[{ required: true, message: "Please select a promo code" }]}
      >
        <Select placeholder="Select a promo code" size="large">
          {promos.map((promo) => (
            <Select.Option value={promo?.code}>{promo?.code}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row>
        <Col span={12}>
          {" "}
          <Form.Item
            label="Active Status"
            name="isActive"
            valuePropName="checked"
          >
            <Switch defaultChecked />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label="Valid From"
            name="validFrom"
            rules={[{ required: true, message: "Please select a start date" }]}
          >
            <DatePicker size="large" format={"DD MMM YYYY"} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Valid Until"
            name="validUntil"
            rules={[{ required: true, message: "Please select an end date" }]}
          >
            <DatePicker size="large" format={"DD MMM YYYY"} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          className="bg-primary text-white hover:text-white"
          htmlType="submit"
        >
          Submit Promo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PromoDetailForm;
