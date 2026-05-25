import { useEffect, useState } from "react";

import { deleteUser, getUsers } from "@/api/authApi";

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

import { toast } from "sonner";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      toast.success("User deleted");
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">
          Team
        </p>

        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Users</h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Manage platform users and access.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Account access</CardTitle>

          <CardDescription>All registered SmartCafe users.</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Name</TableHead>

                <TableHead>Email</TableHead>

                <TableHead>Role</TableHead>

                <TableHead className="pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="pl-6">
                    <p className="font-medium">{user.name}</p>

                    <p className="text-sm text-muted-foreground">
                      ID #{user._id.slice(-5)}
                    </p>
                  </TableCell>

                  <TableCell>{user.email}</TableCell>

                  <TableCell>
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  <TableCell className="pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(user._id)}
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
