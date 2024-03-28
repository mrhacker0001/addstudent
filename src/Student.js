import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

function Student() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ ism: '', fam: '', tel: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('key')) || [];
    setStudents(storedData);
  }, []);

  const formClose = () => {
    setEditIndex(null);
  };

  console.log({formData});

  const talabaQoshish = (data) => {
    data.id = Math.random() + students.length;
    if (data.ism.trim() === '' || data.fam.trim() === '' || data.tel.trim() === '') {
      alert('Iltimos, barcha maydonlarni to\'ldiring.');
      return;
    }

    const updatedStudents = [...students];
    if (editIndex !== null) {
      updatedStudents[editIndex] = data;
    } else {
      updatedStudents.push(data);
    }
    setStudents(updatedStudents);
    localStorage.setItem('key', JSON.stringify(updatedStudents));
    formClose();

  };

  const talabaTahrirlash = (id) => {
    setFormData(students?.find(item=> item?.id === id));
    setEditIndex(id);
  };

  const talabaOchirish = (id) => {
    const updatedStudents = students.filter((item) => item?.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('key', JSON.stringify(updatedStudents));
  };


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div className='Student'>
      <div className="wrapper">


        <div className="students">
          <form onSubmit={handleSubmit(talabaQoshish)}>
            <label>
              <input
                defaultValue={formData?.ism}
                {...register("ism", {
                  required: true,
                  minLength: 3,
                  pattern: /^[a-z]+$/i,
                })}
                onChange={(e) => setFormData({ ...formData, ism: e.target.value })}
                placeholder="Ismingizni kiriting"
                type="text"
              />
              {errors.ism && (<p>
                {errors.ism.type === "pattern" ? "Sonlar kiritilmasligi shart" : "Ushbu maydon to'ldirilishi shart"}
              </p>)}
            </label>

            <label>
              <input
                defaultValue={formData?.fam}
                {...register("fam", {
                  required: true,
                  minLength: 3,
                  pattern: /^[a-z]+$/i,
                })}
                onChange={(e) => setFormData({ ...formData, fam: e.target.value })}
                placeholder="Familiyangizni kiriting"
                type="text"
              />
              {errors.fam && (<p>
                {errors.fam.type === "pattern" ? "Sonlar kiritilmasligi shart" : "Ushbu maydon to'ldirilishi shart"}
              </p>)}

            </label>

            <label>
              <input
                defaultValue={formData?.tel}
                {...register("tel", {
                  required: true,
                  minLength: 3,
                  pattern: /^[0-9]+$/i,
                })}
                onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                placeholder="Telefon raqamingizni kiriting"
                type="text"
              />
              {errors.tel && (
                <p>
                  {errors.tel.type === "pattern" ? "Harflar kiritilmasligi shart" : "Ushbu maydon to'ldirilishi shart"}
                </p>
              )}
            </label>

            <div className="btns">
              <button type="submit">{editIndex !== null ? 'Yangilash' : 'Qo\'shish'}</button>
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
                  <button onClick={() => talabaOchirish(student?.id)} className="btn2">O'chirish</button>
                  <button onClick={() => talabaTahrirlash(student?.id)} className="btn3">Tahrirlash</button>
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