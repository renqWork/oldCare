export function queryCity(params = { data: "" }) {
  return $.ajax({
    type: "get",
    dataType: "json",
    data: params.data,
    url: "tea/api/app/list",
    async: false,
    success: function (res) {
      if (typeof params.success === "function") params.success(res);
    },
    error: function (res) {
      if (typeof params.error === "function") params.error(res);
    },
  });
}
