  export const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "green";
      case "pending":
        return "#FF9800";
      case "failed":
        return "red";
      default:
        return "divider";
    }
  };