import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare } from "lucide-react";
import { getGuestsByCustomerId } from "@/app/(admin)/actions";

export async function GuestList({ customerId }: { customerId: string }) {
    const guests = await getGuestsByCustomerId(customerId);

    if (guests.length === 0) return <p className="text-muted-foreground text-center py-10 border rounded-lg">No RSVPs yet.</p>;

    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Passcode</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {guests.map((guest) => (
                        <TableRow key={guest.id}>
                            <TableCell className="font-medium">{guest.name}</TableCell>
                            <TableCell>
                                {!guest.has_responded ? (
                                    <Badge variant="secondary" className="text-stone-500 hover:bg-stone-100 bg-stone-100 border-transparent">
                                        Not Responded
                                    </Badge>
                                ) : (
                                    <Badge variant={guest.attending ? "default" : "destructive"}>
                                        {guest.attending ? "Attending" : "Declined"}
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 text-stone-500">
                                    <Mail className="h-3 w-3" />
                                    {guest.email}
                                </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate italic text-stone-400">
                                {guest.message || "-"}
                            </TableCell>
                            <TableCell className="font-mono font-bold uppercase tracking-widest text-blue-600">
                                {guest.passcode}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Summary Stat */}
            <div className="p-4 bg-stone-50 border-t text-sm font-medium">
                Total Confirmed Guests: {guests.filter(g => g.attending).length}
            </div>
        </div>
    );
}