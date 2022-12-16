import React, { useState } from "react";
import Button from "../button";
import "./style.css";

const ContactForm = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();

    console.log({
      email,
      message,
    });
  };

  return (
    <form onSubmit={submit} className="contact-form">
      <div className="form-row">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-row">
        <textarea
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </div>
      <div>
        <Button>Gönder</Button>
      </div>
    </form>
  );
};
export default ContactForm;


// NOTE : e.preventDefault() metodu, bir olayın varsayılan davranışını engeller. Örneğin, bir formun gönderilmesi gibi bir olayın varsayılan davranışı, formun verilerinin sunucuya gönderilmesidir. Eğer bir formu gönderirken bir tıklama işleyicisinde e.preventDefault() metodunu çağırsanız, form verilerinin sunucuya gönderilmesi engellenir ve form gönderilmez.
// Bu metodun kullanımı, olayın varsayılan davranışını engellemek için kullanılır. Örneğin, bir linki tıkladığınızda varsayılan olarak sayfayı yeniden yükler. Eğer bir linki tıkladığınızda sayfayı yeniden yüklemek istemiyorsanız ve linkin yönlendirdiği sayfaya yönlendirilmek istiyorsanız, linkin tıklama işleyicisinde e.preventDefault() metodunu çağırabilirsiniz. Bu sayede, sayfa yeniden yüklenmez ve linkin yönlendirdiği sayfaya yönlendirilirsiniz.