import React, { Component } from "react";

export default class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      nomi: "",
      aftor: "",
      janr: "",
      narx: "",
      data: [],
      updatingIndex: null,
      showModal: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { nomi, aftor, janr, narx, data, updatingIndex } = this.state;

    const yangiKitob = { nomi, aftor, janr, narx };

    if (updatingIndex === null) {
      this.setState({
        data: [...data, yangiKitob],
      });
    } else {
      data[updatingIndex] = yangiKitob;
      this.setState({ data, updatingIndex: null });
    }

    this.setState({
      nomi: "",
      aftor: "",
      janr: "",
      narx: "",
      showModal: false,
    });
  };

  deleteBook = (index) => {
    const data = [...this.state.data];
    data.splice(index, 1);
    this.setState({ data });
  };

  editBook = (index) => {
    const kitob = this.state.data[index];
    this.setState({
      nomi: kitob.nomi,
      aftor: kitob.aftor,
      janr: kitob.janr,
      narx: kitob.narx,
      updatingIndex: index,
      showModal: true,
    });
  };

  render() {
    const { nomi, aftor, janr, narx, data, showModal } = this.state;

    return (
      <div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={this.toggleModal}
        >
          + Yangi Kitob Qo'shish
        </button>

        {/* modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center">
            <form
              onSubmit={this.handleSubmit}
              className="bg-white p-6 rounded shadow-md w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">Kitob Ma'lumotlari</h2>

              <input
                type="text"
                name="nomi"
                value={nomi}
                onChange={this.handleChange}
                placeholder="Kitob nomi"
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="aftor"
                value={aftor}
                onChange={this.handleChange}
                placeholder="Aftori"
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="text"
                name="janr"
                value={janr}
                onChange={this.handleChange}
                placeholder="Janri"
                className="w-full mb-3 p-2 border rounded"
                required
              />
              <input
                type="number"
                name="narx"
                value={narx}
                onChange={this.handleChange}
                placeholder="Narxi"
                className="w-full mb-3 p-2 border rounded"
                required
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Saqlash
                </button>
                <button
                  type="button"
                  onClick={this.toggleModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        )}

        {/* table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">#</th>
                <th className="py-2 px-4">Nomi</th>
                <th className="py-2 px-4">Aftori</th>
                <th className="py-2 px-4">Janri</th>
                <th className="py-2 px-4">Narxi</th>
                <th className="py-2 px-4">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Hech qanday kitob yo'q
                  </td>
                </tr>
              )}
              {data.map((kitob, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{kitob.nomi}</td>
                  <td className="py-2 px-4">{kitob.aftor}</td>
                  <td className="py-2 px-4">{kitob.janr}</td>
                  <td className="py-2 px-4">{kitob.narx} so'm</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => this.editBook(i)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.deleteBook(i)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
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
}
