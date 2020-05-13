import React, { useEffect } from "react";

function Contact() {
  useEffect(() => {
    setTimeout(() => {
      document.title = "tttttt";
    }, 10000);
  });

  return <div>contact</div>;
}

export default Contact;
