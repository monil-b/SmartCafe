import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: 1,
    name: "Aanya Shah",
    email: "aanya@smartcafe.in",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Mehta",
    email: "rahul@smartcafe.in",
    role: "Staff",
    status: "Active",
  },
  {
    id: 3,
    name: "Priya Patel",
    email: "priya@smartcafe.in",
    role: "Manager",
    status: "Invited",
  },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
          Team
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Users</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Keep staff access readable at a glance with a clearer table layout and
          lightweight status chips.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Account access</CardTitle>
          <CardDescription>
            Responsive table spacing and clear role separation.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-6">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ID #{user.id}
                    </p>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : "outline"
                        }
                        className={
                          user.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-transparent"
                            : ""
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon-sm"
                        variant="outline"
                        aria-label={`Edit ${user.name}`}
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>

                      <Button
                        size="icon-sm"
                        variant="destructive"
                        aria-label={`Remove ${user.name}`}
                        title="Remove"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
