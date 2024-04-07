"use client";

import { useGetTransactionsQuery } from "@/store/api/transactionsApi";
import TableSkeleton from "./skeleton-loaders/TableSkeleton";
import { cutString } from "@/utils/helpers";
import { time } from "@/utils/time&dates";
import { useRouter } from "next/navigation";
import { useGetCurrentUserQuery } from "@/store/api/userApi";

const tableHeader = [
  "Ref No",
  "Applicant Name",
  "Application Name",
  "Amount Paid",
  "Date Applied",
];

const TransactionsTable = () => {
  const { isLoading, isSuccess, isError, error, data } =
    useGetTransactionsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();
  const role = currentUser?.data?.role;
  const router = useRouter();

  const transactions = data?.data?.transactions;
  console.log(transactions);

  const openTransactionInvoice = (InvoiceId) => {
    if (role !== "USER") {
      router.push(`/admin/financial-management/${InvoiceId}`);
    }
    if (role === "USER") {
      router.push(`/user/transactions/${InvoiceId}`);
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="w-full overflow-x-scroll lg:overflow-x-hidden z-[-10] rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className={`text-sm bg-dark-gray text-gray-400 py-4`}>
          <tr className="whitespace-nowrap">
            {tableHeader.map((data, index) => (
              <th key={index} scope="col" className="lg:px-6 px-4 py-3">
                {data}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {transactions.map((transaction, index) => {
            const columns = Object.keys(data);
            return (
              <tr
                onClick={() => openTransactionInvoice(transaction?.id)}
                key={transaction.id}
                className="whitespace-nowrap lg:whitespace-normal bg-white border-b w-full text-sm cursor-pointer hover:opacity-70"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {cutString(transaction.reference, 10)}
                </th>
                <td className="px-6 py-4 w-80">
                  {transaction?.application?.user?.first_name +
                    " " +
                    transaction?.application?.user?.last_name}
                </td>
                <td className="px-6 py-4 w-80">
                  {transaction?.application?.form?.name}
                </td>
                <td className="px-6 py-4 w-80">{transaction?.amount}</td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1.5 text-xs ${
                      application?.status === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : application?.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    } font-medium rounded-3xl`}
                  >
                    {application.status}
                  </span>
                </td> */}
                <td className="px-6 py-4 space-y-1 flex flex-col items-end ">
                  <p className="">{time.formatDate(transaction?.updatedAt)}</p>
                  <p className="">{time.formatTime(transaction?.updatedAt)}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;