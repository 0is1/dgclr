import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  getCourseAddressFromCourseData,
  getCourseDataFromSearchCourseBySlug,
  getLocationCoordinatesFromCourseData,
} from "../../helpers/course";
import useGetCourseBySlug from "../../hooks/useGetCourseBySlug";
import MapComponent from "./MapComponent";

const MapModal: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useGetCourseBySlug(slug as string);
  const course = getCourseDataFromSearchCourseBySlug(data);
  const title = getCourseAddressFromCourseData(course);
  const coordinates = getLocationCoordinatesFromCourseData(course);
  const showModal = () => {
    Modal.info({
      bodyStyle: {
        padding: "1rem 1rem .5rem",
        minHeight: "50vh",
      },
      width: "80vw",
      title,
      content: <MapComponent coordinates={coordinates} />,
      okText: "Close",
    });
  };
  if (!title) {
    return null;
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Show on Map
      </Button>
    </>
  );
};

export default MapModal;
