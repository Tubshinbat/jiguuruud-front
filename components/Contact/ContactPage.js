"use client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
const { TextArea } = Input;
import "react-toastify/dist/ReactToastify.css";

import { toastControl } from "lib/toastControl";
import { contactAdd } from "lib/faq";

const ContactPage = ({ webInfo }) => {
  const [form] = Form.useForm();
  const requiredRule = {
    required: true,
    message: "Тус талбарыг заавал бөглөнө үү",
  };

  const handleAdd = async (values) => {
    const { success, error } = await contactAdd(values);

    if (success) {
      toastControl("success", success);
      form.resetFields();
    }
    if (error) {
      toastControl("error", error);
    }
  };

  return (
    <>
      <section className="section ">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contactInfos ">
                <div className="contactInfo">
                  <i className="fas fa-map-marker-alt " />
                  <p>{webInfo.address}</p>
                </div>

                <div className="contactInfo">
                  <i className="fas fa-phone  " />
                  <p>
                    <a href={`tel:${webInfo.phone}`}> {webInfo.phone}</a>
                  </p>
                </div>

                <div className="contactInfo">
                  <i className="fas fa-envelope" />
                  <p>
                    <a href={`tel:${webInfo.email}`}> {webInfo.email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  padding: "10px",
                  boxShadow: "0px 0px 15px rgb(0 0 0 / 8%)",
                }}
              >
                <Wrapper apiKey={"AIzaSyBVbaukknpuyvHnYSK_MmpI-5pcBwz83kw"}>
                  <Map latitude={47.915676} longitude={106.904821}></Map>
                </Wrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

const Map = ({ latitude, longitude, children }) => {
  const ref = useRef(null);
  const [map, setMap] = useState(google.maps.Maps || null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new google.maps.Map(ref.current, {
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: true,
          center: {
            lat: latitude ?? 0,
            lng: longitude ?? 0,
          },
          zoom: 13,
        })
      );
    }
  }, [ref, map, latitude, longitude]);

  const marker = new google.maps.Marker({
    position: { lat: 47.915676, lng: 106.904821 },
    map: map,
  });

  return (
    <>
      <div ref={ref} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default ContactPage;
