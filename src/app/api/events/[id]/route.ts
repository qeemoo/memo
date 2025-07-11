import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";

// 특정 일정 삭제 (DELETE)
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully", deletedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event", error: error },
      { status: 500 }
    );
  }
}

// 특정 일정 업데이트 (PATCH - isCompleted 상태 업데이트용)
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const { isCompleted } = await request.json();

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated successfully", updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event", error: error },
      { status: 500 }
    );
  }
}
