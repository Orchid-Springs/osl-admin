import { Space, } from 'antd';
import { UserOutlined, CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';

const Overview = () => {
    const [people, setPeople] = useState(0)
    const [reservation, setReservation] = useState(0)
    const [payment, setPayment] = useState(0);

    const auth = useAuth();

    function calculateTotalAmount(data) {
        let totalAmount = 0;
        
          data.forEach((pay) => {
            if (pay.amount) {
              totalAmount += pay.amount;
            }
          });
        
        return totalAmount;
    }

    useEffect(() => {
        const fetchData = async() => {
            const { data: paymentData } = await axios.get(`https://orchidsprings.cyclic.cloud/api/payment/all`);
            const { data: reservationData} = await axios.get('https://orchidsprings.cyclic.cloud/api/reservation');
            // const deskspaces = await axios.get('https://orchidsprings.cyclic.cloud/api/space?type=space');
            // const roomspaces = await axios.get('https://orchidsprings.cyclic.cloud/api/space?type=room');
            // const officeSpaces = await axios.get('https://orchidsprings.cyclic.cloud/api/space');
            // const promos = await axios.get('https://orchidsprings.cyclic.cloud/api/promo');
            const { data: peopleData } = await axios.get('https://orchidsprings.cyclic.cloud/api/people');


            const total = calculateTotalAmount(paymentData);
            setPeople(peopleData.length);
            setReservation(reservationData.length)
            setPayment(total)

        }

        fetchData()
    },[people])

    return (
        <Space
            direction="horizontal"
            size="large"
            className='flex w-full p-5'
        >
            <div className='w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3'>
                <div className='flex w-[80px] h-full justify-center items-center'>
                    <UserOutlined className='text-4xl' />
                </div>
                <div className='flex flex-col justify-evenly w-[120px] gap-5 text-center'>
                    <h3 className='font-bold text-lg'>Customers</h3>
                    <p className='text-base'>{people && people}</p>
                </div>
            </div>

            <div className='w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3'>
                <div className='flex w-[80px] h-full justify-center items-center'>
                    <CalendarOutlined className='text-4xl'/>
                </div>
                <div className='flex flex-col justify-evenly w-[120px] gap-5 text-center'>
                    <h3 className='font-bold text-lg'>Reservations</h3>
                    <p className='text-base'>{reservation && reservation }</p>
                </div>
            </div>

            {
                auth.user.role === 'super_admin' ?
                (
                    <div className='w-[200px] h-[100px] rounded-3xl bg-white flex items-center hover:scale-105 hover:shadow-lg duration-500 cursor-pointer p-3'>
                        <div className='flex w-[80px] h-full justify-center items-center'>
                            <BarChartOutlined className='text-4xl'/>
                        </div>
                        <div className='flex flex-col justify-evenly w-[120px] gap-5 text-center'>
                            <h3 className='font-bold text-lg'>Payments</h3>
                            <p className='text-base'>₦ {payment && payment }</p>
                        </div>
                    </div>
                ) : ''
            }
        </Space>
    )
};
export default Overview;