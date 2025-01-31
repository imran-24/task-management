import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const taskId = params.id;
    const data = await req.json();
    console.log(taskId)
    if (!taskId) return new NextResponse("Task Id required", { status: 404 });

    const task = await prisma.task.update({
      where: { id: taskId },
      data: data
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("TASK_UPDATE", error);
    return new NextResponse("Server error", { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const userId = await params.id;

    console.log(userId)
    if (!userId) return new NextResponse("User Id required", { status: 404 });

    const tasks = await prisma.task.findMany({
      where: {
        assignedTo:{
          id: userId
        },
        isCompleted: false
      },
      include: {
        organization: true,
        assignedTo: true
      }
    });

    console.log(tasks)

    return NextResponse.json(tasks);
  } catch (error) {
    console.log("TASK_GET_ALL", error);
    return new NextResponse("Server error", { status: 500 });
  }
}


export async function DELETE(_, { params }) {
  try {
    const taskId = params.id;

    if (!taskId) return new NextResponse("Task Id required", { status: 404 });

    await prisma.task.delete({
      where: { id: taskId }
    });

    return new NextResponse("Task deleted", { status: 200 });
  } catch (error) {
    console.log("TASK_DELETE", error);
    return new NextResponse("Server error", { status: 500 });
  }
}