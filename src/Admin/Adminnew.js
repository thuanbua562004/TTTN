import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadImg from "../Admin/UploadImg";
import axios from "../AxiosConfig/config";

const NewsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", para1: "", para2: "", img: [] });
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetchNews();
    }, []);

    // Lấy danh sách tin tức từ API
    const fetchNews = async () => {
        try {
            const response = await axios.get("/news/news");
            setNews(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy tin tức:", error);
        }
    };

    // Xử lý ảnh upload
    const handleResultImg = (data) => {
        setNewPost((prevState) => ({ ...prevState, img: [...prevState.img, data] }));
    };

    // Lưu tin tức mới
    const saveNews = async () => {
        try {
            await axios.post("/news/news", {
                title: newPost.title,
                info: newPost.para1,
                details: newPost.para2,
                img: newPost.img
            });
            setShowModal(false);
            setNewPost({ title: "", para1: "", para2: "", img: [] });
            fetchNews(); // Load lại danh sách tin tức
        } catch (error) {
            console.error("Lỗi khi thêm tin tức:", error);
        }
    };

    // Xóa tin tức
    const deleteNews = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;
        try {
            await axios.delete(`/news/news/${id}`);
            fetchNews(); // Load lại danh sách sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xóa tin tức:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Quản lý danh sách tin</h2>

            <div className="d-flex justify-content-between mb-3">
                <input type="text" className="form-control w-25" placeholder="Tìm kiếm..." />
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Thêm mới</button>
            </div>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Ngày đăng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {news?.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteNews(item._id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal thêm mới */}
            {showModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thêm tin tức</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Tiêu đề"
                                    value={newPost.title}
                                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                />
                                <UploadImg resphoneImg={handleResultImg} />
                                <label>Giới thiệu thông tin</label>
                                <textarea
                                    className="form-control mb-2"
                                    value={newPost.para1}
                                    onChange={(e) => setNewPost({ ...newPost, para1: e.target.value })}
                                />
                                <label>Nhập thông tin chi tiết</label>
                                <textarea
                                    className="form-control"
                                    value={newPost.para2}
                                    onChange={(e) => setNewPost({ ...newPost, para2: e.target.value })}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                                <button
                                    className="btn btn-primary"
                                    onClick={saveNews}
                                    disabled={!newPost.title || !newPost.para1 || !newPost.para2}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsList;
