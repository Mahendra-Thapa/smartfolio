import { useEffect, useState } from "react";
import { axiosAuthInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";

type User = {
  id: number;
  username: string;
  email: string;
  approved: boolean;
  suspended: boolean;
  roles: string[];
};

type FilterType = "all" | "verified" | "unverified" | "suspended";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      let url = "/api/admin/users";

      if (filter === "verified") url = "/api/admin/users/approved";
      if (filter === "unverified") url = "/api/admin/users/not-approved";
      if (filter === "suspended") url = "/api/admin/users/suspended";

      const res = await axiosAuthInstance.get(url);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const suspendUser = async (id: number) => {
    try {
      await axiosAuthInstance.put(`/api/admin/users/${id}/suspend`);

      setUsers(prev =>
        prev.map(user => (user.id === id ? { ...user, suspended: true } : user))
      );
      toast.dismiss();
      toast.success("User suspended successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to suspend user. Please try again.");
      console.error(err);
    }
  };

  const resumeUser = async (id: number) => {
    try {
      await axiosAuthInstance.put(`/api/admin/users/${id}/resume`);

      setUsers(prev =>
        prev.map(user =>
          user.id === id ? { ...user, suspended: false } : user
        )
      );
      toast.dismiss();
      toast.success("User resumed successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to resume user. Please try again.");
      console.error(err);
    }
  };

  const approveUser = async (id: number) => {
    try {
      await axiosAuthInstance.put(`/api/admin/users/${id}/approve`);

      setUsers(prev =>
        prev.map(user => (user.id === id ? { ...user, approved: true } : user))
      );
      toast.dismiss();
      toast.success("User approved successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to approve user. Please try again.");
      console.error(err);
    }
  };

  const renderActions = (user: User) => {
    if (user.suspended) {
      return (
        <button
          onClick={() => resumeUser(user.id)}
          className="text-green-600 hover:text-green-800"
        >
          Resume
        </button>
      );
    }

    if (!user.approved) {
      return (
        <div className="flex gap-3">
          <button
            onClick={() => approveUser(user.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Approve
          </button>

          <button
            onClick={() => suspendUser(user.id)}
            className="text-red-600 hover:text-red-800"
          >
            Suspend
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => suspendUser(user.id)}
        className="text-red-600 hover:text-red-800"
      >
        Suspend
      </button>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Users Management</h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "verified", "unverified", "suspended"].map(item => (
          <button
            key={item}
            onClick={() => setFilter(item as FilterType)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                filter === item
                  ? "bg-[#04296c] text-white"
                  : "bg-slate-100 hover:bg-slate-200"
              }
            `}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ">
        {loading ? (
          <div className="p-6 text-center text-slate-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-center text-slate-500">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-6 py-3">Username</th>
                <th className="text-left px-6 py-3">Email</th>
                <th className="text-left px-6 py-3">Roles</th>
                <th className="text-left px-6 py-3">Status</th>
                <th className="text-left px-6 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-medium">{user.username}</td>

                  <td className="px-6 py-4 text-slate-600">{user.email}</td>

                  <td className="px-6 py-4 text-slate-600">
                    {user.roles.join(", ")}
                  </td>

                  <td className="px-6 py-4">
                    {user.suspended ? (
                      <span className="text-red-600">Suspended</span>
                    ) : user.approved ? (
                      <span className="text-green-600">Verified</span>
                    ) : (
                      <span className="text-yellow-600">Unverified</span>
                    )}
                  </td>

                  <td className="px-6 py-4">{renderActions(user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
