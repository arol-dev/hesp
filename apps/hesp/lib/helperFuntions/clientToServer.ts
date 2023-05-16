export async function apiHelper<Model>(
  modelName: string,
  action: "get" | "post" | "put" | "delete",
  requestData?: any
): Promise<Model | null> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    let url = `/api/${modelName}`;

    if (
      requestData &&
      requestData.id &&
      (action === "get" || action === "put")
    ) {
      url += `/${requestData.id}`;
    }

    let response;

    switch (action) {
      case "get":
        response = await fetch(url, { method: "GET", headers });
        break;
      case "post":
        response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(requestData),
        });
        break;
      case "put":
        const { id, ...updatedData } = requestData;
        response = await fetch(url, {
          method: "PUT",
          headers,
          body: JSON.stringify(updatedData),
        });
        break;
      case "delete":
        response = await fetch(url, {
          method: "DELETE",
          headers,
          body: JSON.stringify(requestData),
        });
        break;
      default:
        throw new Error("Invalid action");
    }

    return response.ok ? ((await response.json()) as Model) : null;
  } catch (error) {
    console.error(`Error in apiHelper: ${(error as Error).message}`);
    return null;
  }
}
