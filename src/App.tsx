import React, { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { yupResolver } from "@hookform/resolvers/yup";
import emailjs from "@emailjs/browser";
import Form from "./models/form.model";
import formSchema from "./schemas/FormSchema";
import axios from "axios";
import "./App.css";

enum AreaOptions {
  ENGINF = "Engº Informática",
  ENGTEL = "Engº Telecomunicações e Informática",
  INFGES = "Informárica e Gestão de Empresas",
  GESINDUS = "Gestão e Engenharia Industrial",
  DADOS = "Ciências de Dados",
  ARCH = "Arquitetura",
  OTHER = "Outro",
}

enum InterestsOptions {
  FULL = "Fullstack",
  FRONT = "Frontend",
  BACK = "Backend",
  NO = "No Preference",
  OTHER = "Outro",
}

enum AvailabilityOptions {
  PARTTIME = "Part-Time Job",
  FULLTIME = "Full-Time Job",
  ACADEMIC = "Academic Internship",
  SUMMER = "Summer Internship",
}

const App: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const formRef = useRef<any>(null);
  const {
    register,
    watch,
    getValues,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      degree: "",
      year: "",
      area: "",
      interests: "",
      availableFor: "",
      notes: "",
    },
    criteriaMode: "all",
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<Form> = (data: Form): void => {
    const body = data;
    console.log(body);
    const templateParams = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      degree: data.degree,
      year: data.year,
      area: data.area,
      interests: data.interests,
      availableFor: data.availableFor,
      notes: data.notes ? data.notes : "No notes",
    };
    axios
      .post(
        `https://bubble-form-a2eb6-default-rtdb.firebaseio.com/users.json`,
        { body }
      )
      .then((res: any) => {
        setIsModal(true);
        console.log(res);
        console.log(res.data);
      });
    emailjs
      .send(
        "service_lr0eii8",
        "template_i95krj5",
        templateParams,
        "fqflitGjfeQQqsngq"
      )
      .then(
        (result) => {
          setIsModal(true);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    emailjs
      .sendForm(
        "service_lr0eii8",
        "template_i95krj5",
        formRef?.current,
        "TFTbPxMFQKeXWAF1A"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const closeModal = () => {
    setValue("email", "");
    setValue("firstName", "");
    setValue("lastName", "");
    setValue("phone", "");
    setValue("degree", "");
    setValue("year", "");
    setValue("area", "");
    setValue("interests", "");
    setValue("availableFor", "");
    setValue("notes", "");
    setIsModal(false);
  };

  return (
    <div className="container">
      <div className="image-container">
        <img
          src="https://bubble-go.cdn.prismic.io/bubble-go/a992a8cb-4738-4c31-84b2-a921c77ad1cc_BubbleGo_logo_white.svg?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&q=50&w=150&h=150"
          alt="logo"
          height="55px"
        />
      </div>
      <div className="form-container">
        <form
          ref={formRef}
          className="input-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="input-container margin-bottom">
            <label htmlFor="email" className="">
              Email :
            </label>
            <input
              type="text"
              {...register("email")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.email"
              }`}
              id="user-name"
              placeholder="Email"
              aria-describedby="user-email-input"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="firstName" className="">
              First Name :
            </label>
            <input
              type="text"
              {...register("firstName")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.firstName"
              }`}
              id="user-name"
              placeholder="First Name"
              aria-describedby="user-name-input"
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="lastName" className="">
              Last Name :
            </label>
            <input
              type="text"
              {...register("lastName")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.lastName"
              }`}
              id="user-name"
              placeholder="Last Name"
              aria-describedby="user-lastname-input"
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="phone" className="">
              Phone Number :
            </label>
            <input
              type="text"
              {...register("phone")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.phone"
              }`}
              id="user-name"
              placeholder="Phone Number"
              aria-describedby="user-phone-input"
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="degree" className="">
              Degree :
            </label>
            <select
              {...register("degree")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.degre"
              }`}
            >
              <option value="Degree">Degree / Bachelors</option>
              <option value="Master">Master</option>
            </select>

            <ErrorMessage
              errors={errors}
              name="degree"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="year" className="">
              Year :
            </label>
            <select
              {...register("year")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.year"
              }`}
            >
              <option value="1º">1º</option>
              <option value="2º">2º</option>
              <option value="3º">3º</option>
              <option value="4º">4º</option>
              <option value="5º">5º</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="year"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="area" className="">
              Major / Area :
            </label>
            <select
              {...register("area")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.area"
              }`}
            >
              <option value={AreaOptions.ENGINF}>{AreaOptions.ENGINF}</option>
              <option value={AreaOptions.ENGTEL}>{AreaOptions.ENGTEL}</option>
              <option value={AreaOptions.INFGES}>{AreaOptions.INFGES}</option>
              <option value={AreaOptions.GESINDUS}>
                {AreaOptions.GESINDUS}
              </option>
              <option value={AreaOptions.DADOS}>{AreaOptions.DADOS}</option>
              <option value={AreaOptions.ARCH}>{AreaOptions.ARCH}</option>
              <option value={AreaOptions.OTHER}>{AreaOptions.OTHER}</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="area"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="interests" className="">
              Interested in :
            </label>
            <select
              {...register("interests")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.interests"
              }`}
            >
              <option value={InterestsOptions.FULL}>
                {InterestsOptions.FULL}
              </option>
              <option value={InterestsOptions.FRONT}>
                {InterestsOptions.FRONT}
              </option>
              <option value={InterestsOptions.BACK}>
                {InterestsOptions.BACK}
              </option>
              <option value={InterestsOptions.NO}>{InterestsOptions.NO}</option>
              <option value={InterestsOptions.OTHER}>
                {InterestsOptions.OTHER}
              </option>
            </select>
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="availableFor" className="">
              Available For :
            </label>
            <select
              {...register("availableFor")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.availableFor"
              }`}
            >
              <option value={AvailabilityOptions.PARTTIME}>
                {AvailabilityOptions.PARTTIME}
              </option>
              <option value={AvailabilityOptions.FULLTIME}>
                {AvailabilityOptions.FULLTIME}
              </option>
              <option value={AvailabilityOptions.SUMMER}>
                {AvailabilityOptions.SUMMER}
              </option>
              <option value={AvailabilityOptions.ACADEMIC}>
                {AvailabilityOptions.ACADEMIC}
              </option>
            </select>
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <div className="input-containermargin-bottom">
            <label htmlFor="notes" className="">
              Notes :
            </label>
            <input
              type="text"
              {...register("notes")}
              className={`form-control ${
                errors.firstName ? "form-error" : "errors.notes"
              }`}
              id="user-name"
              placeholder="notes"
              aria-describedby="user-notes-input"
            />
            <ErrorMessage
              errors={errors}
              name="notes"
              render={({ message }) => (
                <p className="error-message">{message}</p>
              )}
            />
          </div>
          <input
            type="submit"
            onClick={handleSubmit(onSubmit)}
            value="Submit"
          />
        </form>
      </div>
      {isModal && (
        <div className="position">
          <div className="email-modal">
            <div className="modal-content">
              <div className="modal-title">
                <p className="margin-bottom">Let's keep in touch</p>
              </div>
              Thank you for your time!
              <input type="submit" onClick={() => closeModal()} value="Close" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
