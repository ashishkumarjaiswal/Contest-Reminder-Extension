const getContestData = async () => {
  try {
    const data = await fetch(
      "https://contest-reminder-backend.herokuapp.com/getcontestdata"
    );

    const json = await data.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const renderData = async () => {
  const arr = await getContestData();
  const tableBody = document.getElementById("tableBody");

  arr.forEach((item) => {
    if (new Date(item.endingDate).getTime() >= new Date().getTime()) {
      let row = tableBody.insertRow(0);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.innerHTML =
        new Date(item.startingDate).getUTCDate() +
        " " +
        monthNames[new Date(item.startingDate).getUTCMonth()];
      cell2.innerHTML = item.platform;
      cell3.innerHTML = item.name;
      cell4.innerHTML =
        Math.floor(
          (
            new Date(item.endingDate).getTime() -
            new Date(item.startingDate).getTime()
          ).toString() / 3600000
        ) +
        ":" +
        (Math.floor(
          (
            new Date(item.endingDate).getTime() -
            new Date(item.startingDate).getTime()
          ).toString() / 60000
        ) %
          60) +
        ":" +
        (Math.floor(
          (
            new Date(item.endingDate).getTime() -
            new Date(item.startingDate).getTime()
          ).toString() / 1000
        ) %
          60);
      cell5.innerHTML = `<a href = ${item.link} target = _blank >click</a>`;
    }
  });

  const loading = document.getElementById("loading");
  loading.remove();
};

renderData();
