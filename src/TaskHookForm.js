import { nanoid } from "nanoid";
import React from "react";
import { useForm } from "react-hook-form";

export default function TaskHookForm(props) {
  const { kisiler, submitFn } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({ mode: "onBlur" });

  const submitHandler = (data) => {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  };

  return (
    <form className="taskForm" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task basligi yazin.",
            minLength: {
              value: 3,
              message: "Task basligi en az 3 karakterden olusmali",
            },
          })}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Aciklama girmelisiniz.",
            minLength: {
              value: 20,
              message:
                "Minimum 20 karakterden olusan bir aciklama yazmalisiniz.",
            },
          })}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lutfen en az bir kisiyi secin.",
                  validate: (arr) =>
                    arr.length <= 3 || "En fazla 3 kisi secebilirsiniz",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="input-error">{errors.people.message}</p>
        )}
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
