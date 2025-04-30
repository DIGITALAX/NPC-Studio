import ModalsInternal from "../../Modals/modules/ModalsInternal";
import { JSX } from "react";

export default function Wrapper({
  page,
  dict,
}: {
  page: JSX.Element;
  dict: any;
}) {
  return (
    <>
      {page}
      <ModalsInternal dict={dict} />
    </>
  );
}
