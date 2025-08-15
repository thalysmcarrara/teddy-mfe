import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Main } from "./main";
import '@teddy/design-system/styles.css'

const queryClient = new QueryClient()

function CustomersPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  )
}

export default CustomersPage;