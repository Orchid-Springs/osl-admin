import { Space } from 'antd';
import { UserOutlined, CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
import { useAuth } from '../context/auth';
import { useFetchData } from '../hooks/useQueries';

const Overview = () => {
  const auth = useAuth();

  const calculateTotalAmount = (data) => {
    return data.reduce((total, pay) => total + (pay.amount || 0), 0);
  };

  const { data: paymentData, isLoading: paymentLoading } = useFetchData('/payment/all');
  const { data: reservationData, isLoading: reservationLoading } = useFetchData('/reservation');
  const { data: peopleData, isLoading: peopleLoading } = useFetchData('/people');

  const totalPayment = paymentData ? calculateTotalAmount(paymentData) : 0;
  const totalReservation = reservationData ? reservationData.length : 0;
  const totalPeople = peopleData ? peopleData.length : 0;

  if (paymentLoading || reservationLoading || peopleLoading) return <p>Loading...</p>;

  return (
    <Space
      direction="horizontal"
      size="large"
      className="flex w-full p-5"
    >
      <div className="w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3">
        <div className="flex w-[80px] h-full justify-center items-center">
          <UserOutlined className="text-4xl" />
        </div>
        <div className="flex flex-col justify-evenly w-[120px] gap-5 text-center">
          <h3 className="font-bold text-lg">Customers</h3>
          <p className="text-base">{totalPeople}</p>
        </div>
      </div>

      <div className="w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3">
        <div className="flex w-[80px] h-full justify-center items-center">
          <CalendarOutlined className="text-4xl" />
        </div>
        <div className="flex flex-col justify-evenly w-[120px] gap-5 text-center">
          <h3 className="font-bold text-lg">Reservations</h3>
          <p className="text-base">{totalReservation}</p>
        </div>
      </div>

      {auth.user.role === 'super_admin' && (
        <div className="w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3">
          <div className="flex w-[80px] h-full justify-center items-center">
            <BarChartOutlined className="text-4xl" />
          </div>
          <div className="flex flex-col justify-evenly w-[120px] gap-5 text-center">
            <h3 className="font-bold text-lg">Payments</h3>
            <p className="text-base">₦ {totalPayment}</p>
          </div>
        </div>
      )}
    </Space>
  );
};

export default Overview;
