import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../AxiosConfig/config";

export default function CommentSection({ id }) { 
  const [form, setForm] = useState({ name_user: "", comment: "" });
  const [comments, setComments] = useState([]); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getComment = async () => {
    try {
      const response = await axios.get(`/comment/comment/${id}`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getComment();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name_user.trim() || form.comment.length < 15) {
      alert("Vui lòng nhập họ tên và nội dung tối thiểu 15 ký tự.");
      return;
    }

    try {
      await axios.post("/comment/comment", { postId: id, comments: form });
      setForm({ name_user: "", comment: "" });
      getComment(); // Load lại danh sách bình luận sau khi gửi
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };

  return (
    <div className="container mt-5 p-4 bg-white shadow rounded">
      <h3 className="fw-bold mb-4">Bình luận </h3>

      {/* Form nhập bình luận */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Họ tên *"
              type="text"
              name="name_user"
              value={form.name_user}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-3">
          <textarea
            className="form-control"
            placeholder="Nội dung. Tối thiểu 15 ký tự *"
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <button className="btn btn-success mt-3" type="submit">
          <i className="fas fa-paper-plane me-2"></i> GỬI BÌNH LUẬN
        </button>
      </form>
      <p className="text-success">
        Để gửi bình luận, bạn cần nhập tối thiểu trường họ tên và nội dung
      </p>

      {/* Hiển thị danh sách bình luận */}
      <div className="mt-4">
        <h3 className="fw-bold">Bình luận gần đây</h3>
        {comments.length === 0 ? (
          <p className="text-muted">Chưa có bình luận nào.</p>
        ) : (
          comments.map((cmt) => (
            <div key={cmt._id} className="d-flex align-items-start mt-3">
              <img
                alt="User avatar"
                className="rounded-circle me-3"
                src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                width="50"
              />
              <div>
                <p className="fw-bold mb-1">{cmt.name_user}</p>
                <p className="text-muted small">
                  {new Date(cmt.date).toLocaleDateString("vi-VN")}
                </p>
                <p className="mt-2">{cmt.comment}</p>

                {/* Hiển thị phản hồi của admin nếu có */}
                {cmt?.replies && (
                  <div className="mt-3 p-3 bg-light border-start border-success">
                    <p className="fw-bold text-success">Admin phản hồi: {cmt?.replies}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
