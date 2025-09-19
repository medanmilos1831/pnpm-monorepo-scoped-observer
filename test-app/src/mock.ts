const data = {
  accountType: [
    {
      id: 1,
      name: "Personal Account",
      plan: [
        {
          id: 10,
          name: "Free Plan",
          isExtraInfoRequired: false,
        },
        {
          id: 11,
          name: "Premium Plan",
          isExtraInfoRequired: true,
        },
        {
          id: 12,
          name: "Family Plan",
          isExtraInfoRequired: true,
        },
      ],
    },
    {
      id: 2,
      name: "Business Account",
      plan: [
        {
          id: 13,
          name: "Startup",
          isExtraInfoRequired: true,
        },
        {
          id: 14,
          name: "Enterprise",
          isExtraInfoRequired: true,
        },
      ],
    },
    {
      id: 3,
      name: "Dev Account",
      plan: [
        {
          id: 15,
          name: "Sandbox",
          isExtraInfoRequired: false,
        },
        {
          id: 16,
          name: "Pro",
          isExtraInfoRequired: true,
        },
      ],
    },
    {
      id: 4,
      name: "Vip Account",
      plan: [
        {
          id: 17,
          name: "VIP 1",
          isExtraInfoRequired: false,
        },
        {
          id: 18,
          name: "VIP 2",
          isExtraInfoRequired: true,
        },
      ],
    },
  ],
};

export { data };
