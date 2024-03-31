 const data: Payment[] = [
    {
      id: "Algeria",
      Sno: 1,
      CurrencyCode: "DZD",
      Name: "Algeria",
      CurrencySymbol: "$",
      Flag: "<img src='algeria_flag.jpg' alt='Algeria Flag' />"
    },
    {
      id: "United States",
      Sno: 2,
      CurrencyCode: "USD",
      Name: "United States",
      CurrencySymbol: "$",
      Flag: "<img src='usa_flag.jpg' alt='USA Flag' />"
    },
    {
      id: "United Kingdom",
      Sno: 3,
      CurrencyCode: "GBP",
      Name: "United Kingdom",
      CurrencySymbol: "£",
      Flag: "<img src='uk_flag.jpg' alt='UK Flag' />"
    },
    {
      id: "Canada",
      Sno: 4,
      CurrencyCode: "CAD",
      Name: "Canada",
      CurrencySymbol: "$",
      Flag: "<img src='canada_flag.jpg' alt='Canada Flag' />"
    },
    {
      id: "Australia",
      Sno: 5,
      CurrencyCode: "AUD",
      Name: "Australia",
      CurrencySymbol: "$",
      Flag: "<img src='australia_flag.jpg' alt='Australia Flag' />"
    },
    {
      id: "Germany",
      Sno: 6,
      CurrencyCode: "EUR",
      Name: "Germany",
      CurrencySymbol: "€",
      Flag: "<img src='germany_flag.jpg' alt='Germany Flag' />"
    },
    {
      id: "France",
      Sno: 7,
      CurrencyCode: "EUR",
      Name: "France",
      CurrencySymbol: "€",
      Flag: "<img src='france_flag.jpg' alt='France Flag' />"
    },
    {
      id: "Japan",
      Sno: 8,
      CurrencyCode: "JPY",
      Name: "Japan",
      CurrencySymbol: "¥",
      Flag: "<img src='japan_flag.jpg' alt='Japan Flag' />"
    },
    {
      id: "China",
      Sno: 9,
      CurrencyCode: "CNY",
      Name: "China",
      CurrencySymbol: "¥",
      Flag: "<img src='china_flag.jpg' alt='China Flag' />"
    },
    {
      id: "India",
      Sno: 10,
      CurrencyCode: "INR",
      Name: "India",
      CurrencySymbol: "₹",
      Flag: "<img src='india_flag.jpg' alt='India Flag' />"
    },
    {
      id: "Brazil",
      Sno: 11,
      CurrencyCode: "BRL",
      Name: "Brazil",
      CurrencySymbol: "R$",
      Flag: "<img src='brazil_flag.jpg' alt='Brazil Flag' />"
    },
    {
      id: "Russia",
      Sno: 12,
      CurrencyCode: "RUB",
      Name: "Russia",
      CurrencySymbol: "₽",
      Flag: "<img src='russia_flag.jpg' alt='Russia Flag' />"
    },
    {
      id: "South Africa",
      Sno: 13,
      CurrencyCode: "ZAR",
      Name: "South Africa",
      CurrencySymbol: "R",
      Flag: "<img src='south_africa_flag.jpg' alt='South Africa Flag' />"
    },
    {
      id: "Mexico",
      Sno: 14,
      CurrencyCode: "MXN",
      Name: "Mexico",
      CurrencySymbol: "$",
      Flag: "<img src='mexico_flag.jpg' alt='Mexico Flag' />"
    },
    {
      id: "South Korea",
      Sno: 15,
      CurrencyCode: "KRW",
      Name: "South Korea",
      CurrencySymbol: "₩",
      Flag: "<img src='south_korea_flag.jpg' alt='South Korea Flag' />"
    },
    {
        id: "Nigeria",
        Sno: 3,
        CurrencyCode: "NGN",
        Name: "Nigeria",
        CurrencySymbol: "₦",
        Flag: "<img src='nigeria_flag.jpg' alt='Nigeria Flag' />"
      },
      {
        id: "Ghana",
        Sno: 2,
        CurrencyCode: "GHS",
        Name: "Ghana",
        CurrencySymbol: "₵",
        Flag: "<img src='ghana_flag.jpg' alt='Ghana Flag' />"
      }
  ];
  

export type Payment = {
  id: string
  Sno: number
  Flag?: string; 
  CurrencyCode: string
  CurrencySymbol?: string;
  Name: string
}
export default data;
