import { api } from "../boot/axios";

class CommonService {
  listAllEvent() {
    return api.get("/list-event-simplified", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listAllVaBank() {
    return api.post(
      "/payment/payment-method-list",
      {},
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  }

  listAllProfesi() {
    return api.get("/jenis-profesi/list", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listAllJenisEvent() {
    return api.get("/jenis-event/list", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listAllPenyelenggara() {
    return api.get("/penyelenggara/list", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listAllAgama() {
    return api.get("/user-agama-simplified/list", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listAllJenisKelamin() {
    return api.get("/jenis-kelamin-simplified/list", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listProvinsi() {
    return api.get("/propinsi", {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listKabupaten(provinsi_id) {
    return api.get("/kabupaten/" + provinsi_id, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listKecamatan(kabupaten_id) {
    return api.get("/kecamatan/" + kabupaten_id, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listKelurahan(kecamatan_id) {
    return api.get("/kelurahan/" + kecamatan_id, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }

  listKeilmuan() {
    return api.get("jenis-keilmuan/list", {});
  }
}

export default new CommonService();
