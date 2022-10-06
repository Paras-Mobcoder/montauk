import { useEffect, useState } from "react";
import { Box, Checkbox, Pagination, Typography } from "@mui/material";
import { Stack, Container } from "@mui/system";
import {getFoodListService} from "../API/Services/Services"
import { DebounceInput } from 'react-debounce-input';
import CircularProgress from '@mui/material/CircularProgress';
import RowData from "./RowData";

interface FoodList {
  brandOwner: string;
  dataType: string;
  description: string;
  fdcId: number;
  gtinUpc: number;
}

export function FoodList() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [foodlist, setFoodList] = useState<FoodList[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const [carbsCheck, setCarbsCheck] = useState<boolean>(false);
  const [protienCheck, setProtienCheck] = useState<boolean>(false);
  const [fatsCheck, setFatsCheck] = useState<boolean>(false);
  const [vitaminsCheck, setVitaminsCheck] = useState<boolean>(false);
  const [mineralsCheck, setMineralsCheck] = useState<boolean>(false);
  const [dietFibreCheck, setdietFibreCheck] = useState<boolean>(false);

  const pageSize = 10;

  useEffect(() => {
    getFoodListService(
      searchText,
      pageSize,
      pageNo,
      mineralsCheck,
      carbsCheck,
      protienCheck,
      fatsCheck,
      vitaminsCheck,
      dietFibreCheck
    )
      .then((res) => handleData(res))
      .catch((error) => console.log("error---", error));
  }, [
    searchText,
    pageNo,
    mineralsCheck,
    carbsCheck,
    protienCheck,
    fatsCheck,
    vitaminsCheck,
    dietFibreCheck,
  ]);

  const handleSearch = (data: string) => {
    setPageNo(1);
    setSearchInput(data)
  }

  const handleData = (data: any) => {
    setFoodList(data?.data?.foods);
    setLoading(false);
  };

  const onPageChange = (event: any, value: number) => {
    setPageNo(value);
  };

  if (Loading) {
    return (
      <CircularProgress className="mt-4" />
    )
  }

  return (
    <>
      <Container className="flex flex-row justify-center items-center bg-[#EDECFA] mb-4">
        <h2 className="italic font-bold text-xl py-12">List of Food Items</h2>
      </Container>
      <Container className="flex flex-row justify-center items-center mb-4">

        {searchText === "" ? (
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Carbohydrates</Typography>
              <Checkbox
                checked={carbsCheck}
                onChange={(event) => setCarbsCheck(event.target.checked)}
              />
            </div>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Protien</Typography>
              <Checkbox
                checked={protienCheck}
                onChange={(event) => setProtienCheck(event.target.checked)}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Minerals</Typography>
              <Checkbox
                checked={mineralsCheck}
                onChange={(event) => setMineralsCheck(event.target.checked)}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Fats</Typography>
              <Checkbox
                checked={fatsCheck}
                onChange={(event) => setFatsCheck(event.target.checked)}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Vitamins</Typography>
              <Checkbox
                checked={vitaminsCheck}
                onChange={(event) => setVitaminsCheck(event.target.checked)}
              />
            </Box>
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography>Dietary Fibre</Typography>
              <Checkbox
                checked={dietFibreCheck}
                onChange={(event) => setdietFibreCheck(event.target.checked)}
              />
            </Box>
          </div>
        ) : null}

      </Container>
      <DebounceInput id="standard-basic" className="text-center" placeholder="Search Food Item" type="text" debounceTimeout={500} variant="standard" onChange={(data) => handleSearch(data.target.value)} autoFocus />
      {foodlist?.length && !Loading ?
        <>
          <RowData rows={foodlist} searchInput={searchInput} />
          <Stack className="py-4" spacing={2}>
            <Pagination className="mx-auto" count={10} onChange={onPageChange} color="primary" />
          </Stack> </>
        : <div>No Data Found</div>}
    </>
  );
}
