import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Home, Truck, ClipboardList } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import cartService from "@/services/cart";
import Link from "next/link";

// Sample order data structure
const orderData = {
  orderId: "ORD-12345XYZ",
  status: "In Transit",
  estimatedDelivery: "August 29, 2025",
  progress: 66,
  shippingAddress: {
    name: "Motaz",
    address: "Trendline",
  },
  items: [
    { id: 1, name: "Leather Wallet", quantity: 1, price: "$50" },
    { id: 2, name: "Bag", quantity: 1, price: "$90" },
  ],
  history: [
    {
      status: "Delivered",
      date: "August 29, 2025",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    },
    {
      status: "Out for Delivery",
      date: "August 28, 2025",
      icon: <Truck className="h-5 w-5 text-blue-500" />,
    },
    {
      status: "In Transit",
      date: "August 27, 2025",
      icon: <Package className="h-5 w-5 text-blue-500" />,
    },
    {
      status: "Order Confirmed",
      date: "August 26, 2025",
      icon: <ClipboardList className="h-5 w-5 text-blue-500" />,
    },
  ],
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const t = await getTranslations();
  const statusData = await cartService.trackOrder(id);
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <CardTitle className="text-2xl">{t("Order Tracking")}</CardTitle>
              <CardDescription className="mt-2">
                {t("Track the status of your order")}: #{id}
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 capitalize text-lg font-semibold text-primary">
              {statusData.data.status}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* <div className="mb-6">
            <Progress value={orderData.progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">
              Estimated Delivery: {orderData.estimatedDelivery}
            </p>
          </div>
          <Separator />
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <div className="text-muted-foreground">
                <p>{orderData.shippingAddress.name}</p>
                <p>{orderData.shippingAddress.address}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
              <ul className="text-muted-foreground space-y-1">
                {orderData.items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div>
            <h3 className="text-lg font-semibold mb-4">Order History</h3>
            <div className="relative">
              <div className="absolute left-2 h-full border-l-2 border-dashed border-gray-200"></div>
              {orderData.history.map((event, index) => (
                <div key={index} className="flex items-start mb-6">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 z-10">
                    {event.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{event.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Link href={"/"}>
            <Button
              variant="outline"
              className="border-main hover:border-main/80 text-main hover:text-main duration-300 cursor-pointer"
            >
              <Home className="mr-2 h-4 w-4" />
              {t("Back to Store")}
            </Button>
          </Link>
          <Link href={"/contact-us"}>
            <Button className="bg-main hover:bg-main/80 duration-300 cursor-pointer">
              {t("Contact Us")}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
