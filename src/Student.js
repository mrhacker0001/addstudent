import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function Student() {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { ism: "", fam: "", tel: "" },
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("key")) || [];
    setStudents(storedData);
  }, []);

  const formClose = () => {
    setEditIndex(null);
    reset();
  };

  const onCreateStudent = (data) => {
    if (
      data.ism.trim() === "" ||
      data.fam.trim() === "" ||
      data.tel.trim() === ""
    ) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }
    if (!editIndex) {
      data.id = Math.random() + students.length;
      setStudents([...students, data]);
      localStorage.setItem("key", JSON.stringify([...students, data]));
    } else {
      setStudents(
        students.map((item) => {
          if (item?.id === editIndex) {
            return data;
          }
          return item;
        })
      );
      localStorage.setItem(
        "key",
        JSON.stringify(
          students.map((item) => {
            if (item?.id === data?.id) {
              return data;
            }
            return item;
          })
        )
      );
    }
    formClose();
  };

  const talabaTahrirlash = (id) => {
    const isStudent = students?.find((item) => item?.id === id);
    Object.keys(isStudent).forEach((key) => {
      setValue(key, isStudent[key]);
    });
    // isStudent.ism && isStudent.fam && isStudent.tel  => [ism, fam, tel]
    setEditIndex(id);
  };

  const talabaOchirish = (id) => {
    const updatedStudents = students.filter((item) => item?.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("key", JSON.stringify(updatedStudents));
  };

  return (
    <div className="Student">
      <div className="wrapper">
        <div className="students">
          <form onSubmit={handleSubmit(onCreateStudent)}>
            <label>
              <input
                {...register("ism", {
                  required: true,
                  minLength: 3,
                  pattern: /^[a-z]+$/i,
                })}
                placeholder="Ismingizni kiriting"
                type="text"
              />
              {errors.ism && (
                <p>
                  {errors.ism.type === "pattern"
                    ? "Sonlar kiritilmasligi shart"
                    : "Ushbu maydon to'ldirilishi shart"}
                </p>
              )}
            </label>

            <label>
              <input
                {...register("fam", {
                  required: true,
                  minLength: 3,
                  pattern: /^[a-z]+$/i,
                })}
                placeholder="Familiyangizni kiriting"
                type="text"
              />
              {errors.fam && (
                <p>
                  {errors.fam.type === "pattern"
                    ? "Sonlar kiritilmasligi shart"
                    : "Ushbu maydon to'ldirilishi shart"}
                </p>
              )}
            </label>

            <label>
              <input
                {...register("tel", {
                  required: true,
                  minLength: 3,
                  pattern: /^[0-9]+$/i,
                })}
                placeholder="Telefon raqamingizni kiriting"
                type="text"
              />
              {errors.tel && (
                <p>
                  {errors.tel.type === "pattern"
                    ? "Harflar kiritilmasligi shart"
                    : "Ushbu maydon to'ldirilishi shart"}
                </p>
              )}
            </label>

            <div className="btns">
              <button type="submit">
                {editIndex !== null ? "Yangilash" : "Qo'shish"}
              </button>
            </div>
          </form>
        </div>

        <table border="1px">
          <thead>
            <tr>
              <td>ID</td>
              <td>Ismi</td>
              <td>Familiyasi</td>
              <td>Telefon raqami</td>
              <td>Tahrirlash / O'chirish</td>
            </tr>
          </thead>
          <tbody>
            {students.map((student, id) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{student.ism}</td>
                <td>{student.fam}</td>
                <td>{student.tel}</td>
                <td id="action">
                  <button
                    onClick={() => talabaOchirish(student?.id)}
                    className="btn2"
                  >
                    O'chirish
                  </button>
                  <button
                    onClick={() => talabaTahrirlash(student?.id)}
                    className="btn3"
                  >
                    Tahrirlash
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Student;
