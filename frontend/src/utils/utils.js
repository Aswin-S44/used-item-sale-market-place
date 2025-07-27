import { format } from "date-fns";

export const convertContentfullResponse = async (resp) => {
  const formattedResponse = [];

  if (resp.length > 0) {
    resp.forEach((item, index) => {
      console.log("item : ", item);
      const entry = {
        id: index + 1,
        slug: item.fields.categoryName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
        title: item.fields.categoryName,
        date: new Date(item.fields.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        image: item.fields.categoryImage?.fields?.file?.url || "",
        alt: item.fields.categoryName.toLowerCase().replace(/\s+/g, " "),
        sections:
          item.fields.sections?.map((section) => ({
            content: section,
          })) || [],
      };

      formattedResponse.push(entry);
    });
  }

  return formattedResponse;
};

export const formatDate = (isoDate) => {
  if (!isoDate) return "N/A"; // or return empty string or null
  const date = new Date(isoDate);
  if (isNaN(date)) return "Invalid date"; // handle malformed values
  return format(date, "do MMMM yyyy");
};
