import axios from "axios";

const request = axios.create({
  baseURL: "https://www.eventbriteapi.com/v3/events/search/?location.address=manchester&start_date.range_start=2019-10-25T00%3A00%3A00&start_date.range_end=2019-10-26T00%3A00%3A00&token=VBUSKKCQ2VTXKPOP34PX"
});

export const getEvents = async params => {
  const { data } = await request.get();
  return data;
};