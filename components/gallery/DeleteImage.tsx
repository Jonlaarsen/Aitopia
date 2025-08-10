import React, { useId } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteImage } from "@/app/actions/image-actions";
import { cn } from "@/lib/utils";

interface DeleteImageProps {
  imageId: string;
  onDelete: () => void;
  className?: string;
  imageName: string;
}
const DeleteImage = ({
  imageId,
  onDelete,
  className,
  imageName,
}: DeleteImageProps) => {
  const toastId = useId();

  const handleDelete = async () => {
    toast.loading("Deleting image...", { id: toastId });

    const { error, success } = await deleteImage(Number(imageId), imageName);
    if (error) {
      toast.error("Failed to delete image, please try again", { id: toastId });
    } else if (success) {
      toast.success("Image deleted successfully!", { id: toastId });
      onDelete?.();
    } else {
      toast.dismiss(toastId);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(`w-fit`, className)} variant={"destructive"}>
          Delete <Trash2 className="w-4 h-4 " />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            This action cannot be undone. This will{" "}
            <span className="font-bold">permanently</span> delete your image
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-700 hover:bg-red-700/60"
            onClick={handleDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteImage;
