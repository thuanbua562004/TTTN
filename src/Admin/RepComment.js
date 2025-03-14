import React, { useState, useEffect } from "react";
import axios from "../AxiosConfig/config";

function AdminComments() {
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/comment/comment");
      setComments(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy bình luận:", error);
    }
    setLoading(false);
  };
  const handleReply = async (postId, id) => {
    try {
      await axios.put(`/comment/comment/reply`, {
        postId,
        id,
        reply,
      });
      fetchComments();
    } catch (error) {
      console.error("L��i khi phản hồi:", error);
    }
  }

  const handleDelete = async (postId ,id_comment) => {
    try {
    await axios.delete(`/comment/comment/${postId}/${id_comment}`);
      alert("Đã xóa bình luận!");
      fetchComments();
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };
  console.log(comments)
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Quản lý bình luận</h2>

      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
          <p>Đang tải bình luận...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID Bài Viết</th>
                <th>Người dùng</th>
                <th>Nội dung</th>
                <th>Ngày</th>
                <th>Phản hồi</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((post) =>
                post.comments.map((comment) => (
                  <tr key={comment.id}>
                    <td>{post.postId}</td>
                    <td>{comment.name_user}</td>
                    <td>{comment.comment}</td>
                    <td>{new Date(comment.date).toLocaleString()}</td>
                    <td>
                      {comment?.replies?.[0] ? (
                          <p  className="text-success">
                            <strong>Admin:</strong> {comment?.replies}
                          </p>
                      ) : (
                        <input
                        value={reply}
                          type="text"
                          className="form-control"
                          placeholder="Nhập phản hồi..."
                        onChange={(e)=>{setReply(e.target.value)}}
                        />
                      )}
                    </td>
                    <td>
                      {!comment.replies && (
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={()=>handleReply(post.postId,comment._id)}
                        >
                          {submitting ? (
                            <div className="spinner-border spinner-border-sm"></div>
                          ) : (
                            "Trả lời"
                          )}
                        </button>
                      )}
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(post.postId,comment._id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminComments;
