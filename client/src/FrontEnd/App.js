import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { Home } from './pages/Home';
import { ContactUs } from './pages/Contact-Us';
import { RegisterAsProfessional } from './pages/Register-as-professional';
import { ServicesCategories } from './pages/Services/ServicesCategories';
import { ClientOrders } from './container/Orders-Dashboards/ClientOrders'
import { SignUp } from './container/SignIn-SignUp/Sign-Up/SignUp';
import { SignIn } from './container/SignIn-SignUp/Sign-In/SignIn';

import { ApplianceRepair, Electrician, Plumbing, Painter } from './pages/Services/AllServices';

import { AcRepairCheckout, MicrowaveRepairCheckout, RefrigeratorRepairCheckout, WashingMachineRepairCheckout, HouseholdApplianceRepairCheckout, MixerGrinderRepairCheckout, DishwasherRepairCheckout } from './pages/service-details-pages/appliance-repair/ApplianceRepairCheckout';

import { Fan, Switchboard, Fuse, NewInternalWiring, InverterServicing, LightFitting, CCTVCamera, Doorbell } from './pages/service-details-pages/electrician/ElectricianCheckout'

import { WaterTank, TabAndMixer, BasinAndSink, ToiletAndBathroom, WaterLeakage, WholeHousePlumbing } from './pages/service-details-pages/plumbing/PlumbingCheckout';

import { RoomPainting, PrimerPainting, DecorativeWallPainting } from './pages/service-details-pages/painter/PainterCheckout';


// pages for admin dashboard

import AdminHome from "./pages/admin-dashboard-pages/admin-home/adminHome";
import UserList from "./pages/admin-dashboard-pages/users/userList/UserList";
import User from "./pages/admin-dashboard-pages/users/user/User";

import ServiceList from "./pages/admin-dashboard-pages/services/serviceList/ServiceList";
import Service from "./pages/admin-dashboard-pages/services/service/Service";
import NewService from "./pages/admin-dashboard-pages/services/newServices/NewService";
import ProfessionalList from "./pages/admin-dashboard-pages/professionals/professionalList/ProfessionalList";
import Professional from "./pages/admin-dashboard-pages/professionals/professional/Professional";
import NewProfessional from "./pages/admin-dashboard-pages/professionals/newProfessional/NewProfessional";
import AdminList from "./pages/admin-dashboard-pages/admins/adminList/AdminList";
import Admin from "./pages/admin-dashboard-pages/admins/admin/Admin";
import NewAdmin from "./pages/admin-dashboard-pages/admins/newAdmin/NewAdmin";
import CheckoutForm from './pages/checkout-form/CheckoutForm';
import Error from './pages/Error Page/Error';
import UnderConstruction from './pages/under-construction/UnderConstruction';
import Success from './pages/Success/Success';

import UserDashboard from './pages/user-dashboard/userDashboard';



function App() {

  const [data, setData] = useState({});

  // Data is passed in local storage from sign in form
  useEffect(() => {
    const response = localStorage.getItem("response");
    if (response) {
      setData(JSON.parse(response));
    }
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Categories" element={<ServicesCategories />} />
        <Route path="/Contact-Us" element={<ContactUs />} />
        <Route path="/checkout/:category/:service" element={<CheckoutForm />} />
        <Route path="/Orders" element={<ClientOrders />} />
        <Route path="/admin-dashboard" element={<AdminHome />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/user/:userId" element={<User />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/service/:ServiceId" element={<Service />} />
        <Route path="/newService" element={<NewService />} />

        <Route path="/professionals" element={<ProfessionalList />} />
        <Route path="/professional/:professionalId" element={<Professional />} />
        <Route path="/createProfessional" element={<NewProfessional />} />

        <Route path="/admins" element={<AdminList />} />
        <Route path="/admin/:adminId" element={<Admin />} />
        <Route path="/newAdmin" element={<NewAdmin />} />

        {/* Link in pages/services/ServicesCategories*/}
        <Route path="/Categories/appliance_repair" element={<ApplianceRepair />} />
        <Route path="/Categories/electrician" element={<Electrician />} />
        <Route path="/Categories/plumbing" element={<Plumbing />} />
        <Route path="/Categories/painter" element={<Painter />} />
        {/* <Route path="/Categories/house_cleaning" element={<HouseCleaning />} />
        <Route path="/Categories/makeup_artist" element={<BeautyAndSpa />} />
        <Route path="/Categories/online_instructor" element={<OnlineInstructor />} />
        <Route path="/Categories/event_management" element={<EventManagement />} />
        <Route path="/Categories/business" element={<Business />} /> */}


        {/* Link in components/services/services.jsx */}
        <Route path="/categories/appliance_repair/ac_repair" element={<AcRepairCheckout />} />
        <Route path="/categories/appliance_repair/microwave_repair" element={<MicrowaveRepairCheckout />} />
        <Route path="/categories/appliance_repair/refrigerator_repair" element={<RefrigeratorRepairCheckout />} />
        <Route path="/categories/appliance_repair/washing_machine_repair" element={<WashingMachineRepairCheckout />} />
        <Route path="/categories/appliance_repair/ac_repair" element={<HouseholdApplianceRepairCheckout />} />
        <Route path="/categories/appliance_repair/mixer_grinder_repair" element={<MixerGrinderRepairCheckout />} />
        <Route path="/categories/appliance_repair/dishwasher_repair" element={<DishwasherRepairCheckout />} />
        <Route path="/categories/appliance_repair/household_appliance_repair" element={< HouseholdApplianceRepairCheckout />} />


        <Route path="/categories/electrician/fan" element={<Fan />} />
        <Route path="/categories/electrician/fuse" element={<Fuse />} />
        <Route path="/categories/electrician/switchboard" element={<Switchboard />} />
        <Route path="/categories/electrician/new_internal_wiring" element={<NewInternalWiring />} />
        <Route path="/categories/electrician/inverter_servicing" element={<InverterServicing />} />
        <Route path="/categories/electrician/light_fitting" element={<LightFitting />} />
        <Route path="/categories/electrician/cctv_camera" element={<CCTVCamera />} />
        <Route path="/categories/electrician/door_bell" element={<Doorbell />} />

        <Route path="/categories/plumbing/water_tank" element={<WaterTank />} />
        <Route path="/categories/plumbing/tab_and_mixer" element={<TabAndMixer />} />
        <Route path="/categories/plumbing/basin_and_sink" element={<BasinAndSink />} />
        <Route path="/categories/plumbing/toilet_and_bathroom" element={<ToiletAndBathroom />} />
        <Route path="/categories/plumbing/water_leakage" element={<WaterLeakage />} />
        <Route path="/categories/plumbing/whole_house_plumbing" element={<WholeHousePlumbing />} />

        <Route path="/categories/painter/room_painting" element={<RoomPainting />} />
        <Route path="/categories/painter/primer_painting" element={<PrimerPainting />} />
        <Route path="/categories/painter/decorative_wall_painting" element={<DecorativeWallPainting />} />

        {data && (
          <Route
            path="/dashboard"
            element={
              data.role === "admin" ? (
                <AdminHome />
              ) : data.role === "professional" ? (
                <UnderConstruction />
              ) : (
                <UserDashboard />
              )
            }
          />
        )}

        <Route path="/RegisterAsProfessional" element={<RegisterAsProfessional />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="*" element={<Error />} />
        <Route path="/under-construction" element={<UnderConstruction />} />
        <Route path="/success.html" element={<Success />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
