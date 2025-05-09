"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
  FormField
} from "@/components/ui/form"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  X,
  ChevronDown,
  ChevronsUpDown,
  Check,
  CheckCircle
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { SiGitea } from "react-icons/si"
import { licenses } from "@/app/config/Licenses"

export const formSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }).max(100, { message: "Name must be less than 100 characters" }).regex(/^[^ ]+$/, { message: "Repo name may not contain spaces" }),
  description: z.string().max(2048, { message: "Description must be less than 2,048 characters" }),
  pvt: z.boolean(),
  readme: z.boolean(),
  license: z.string().max(50, { message: "Invalid license name" }),
  gitUser: z.string().nonempty({ message: "Your Gitea username is missing from your account" }),
})

function CreateRepoForm({ onSubmitSuccess, isLoading, gitUser, setCurrentRepoName }: { onSubmitSuccess: (values: z.infer<typeof formSchema>) => void, isLoading: boolean, gitUser: string, setCurrentRepoName: (name: string) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    shouldFocusError: false,
    defaultValues: {
      name: "",
      description: "",
      pvt: false,
      readme: true,
      license: "",
      gitUser: gitUser,
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setCurrentRepoName(values.name)
    onSubmitSuccess(values)
  }

  const currentRepoName = form.watch("name")

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Repository Name<span className="text-red-500 ml-0.5">*</span></FormLabel>
              <FormControl>
                <Input placeholder="my-repo" {...field} className="mt-2" />
              </FormControl>
              <FormDescription>
                The name of your newly created repository.<br />
                <b>Ex:</b> {gitUser}/<span className="underline">my-repo</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="This is a description of the repository." {...field} className="mt-2" />
              </FormControl>
              <FormDescription>
                A short description your new repository.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <h2 className="text-sm font-bold">Initialization</h2>
        <FormField
          control={form.control}
          name="pvt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between gap-2 mt-4">
                  <Label htmlFor="private">Visibility</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Label htmlFor="private">{field.value ? "Private" : "Public"}</Label>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => field.onChange(true)}>Private</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => field.onChange(false)}>Public</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover modal>
                <div className="flex items-center justify-between gap-2">
                  {/* TODO: implement lazy loading? */}
                  <Label htmlFor="license">License</Label>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? licenses.find(
                              (license) => license.value === field.value
                            )?.label
                          : "Select license"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search license..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No license found.</CommandEmpty>
                      <CommandGroup>
                        {licenses.map((license) => (
                          <CommandItem
                            value={license.label}
                            key={license.value}
                            onSelect={() => {
                              form.setValue("license", license.value, { shouldValidate: true, shouldDirty: true })
                              form.trigger()
                            }}
                          >
                            {license.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                license.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="readme"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-between gap-2 mt-4">
                  <Label htmlFor="readme">Add README</Label>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>DEBUG</p>
        <p>Git User: {gitUser}</p>
        <p>Repo Name: {currentRepoName}</p>
        <p>Valid: {form.formState.isValid ? "true" : "false"}</p>
        <p>Dirty: {form.formState.isDirty ? "true" : "false"}</p>
        <p>Loading: {isLoading ? "true" : "false"}</p>
        <p>Is Name Filled: {form.watch("name") ? "true" : "false"}</p>
        <p>Is Description Filled: {form.watch("description") ? "true" : "false"}</p>
        <p>Is License Filled: {form.watch("license") ? "true" : "false"}</p>
        <p>Is Readme Filled: {form.watch("readme") ? "true" : "false"}</p>
        <p>Is Private Filled: {form.watch("pvt") ? "true" : "false"}</p>
        <div className="flex items-center justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full mt-4 cursor-pointer" disabled={isLoading}>
              <X className="h-4 w-4" />
              <p className="text-sm">
                Cancel
              </p>
            </Button>
          </DialogClose>
          <Button type="submit" className={cn("w-full mt-4", form.formState.isValid && form.formState.isDirty && "cursor-pointer")} disabled={isLoading || !form.formState.isValid || !form.formState.isDirty}>
            <Plus className="h-4 w-4" />
            <p className="text-sm">
              Create {((gitUser && currentRepoName) ? `${gitUser}/` : "") + currentRepoName || "Repository"}
            </p>
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function CreateRepo({ gitUser }: { gitUser: string }) {
  const [loading, setLoading] = useState(false)
  const [wasCreated, setWasCreated] = useState(false)
  const [currentRepoName, setCurrentRepoName] = useState("")

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    console.log("[i] createRepo form submitted, sending to API")

    const response = await fetch("/api/git/repo", {
      method: "POST",
      body: JSON.stringify(values),
    })
    const data = await response.json()

    if (!response.ok) {
      setLoading(false)
      setWasCreated(false)
    } else {
      console.log("[i] Response:", data)
      setLoading(false)
      setWasCreated(data.success)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create New Repository</Button>
      </DialogTrigger>
      <DialogContent
        closeClassName="absolute right-6.5 top-6.5"
      >
        <DialogHeader className="flex items-center justify-between mb-4">
          <DialogTitle>Create New Repository</DialogTitle>
        </DialogHeader>
        {wasCreated ? (
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-y-3 mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="h-10 w-10 text-green-500" />
                <h2 className="text-2xl font-bold">Created!</h2>
              </div>
              <p className="text-sm px-auto text-center">Your repository has been created successfully on LibreCloud Git!</p>
              <p className="text-sm px-auto text-center">Your LibreCloud account includes unlimited repository storage, within reason. That being said, please respect our servers!</p>
            </div>
            <Button className="cursor-pointer" disabled={loading} onClick={() => window.open(`${process.env.NEXT_PUBLIC_GITEA_URL}/${gitUser}/${currentRepoName}`, "_blank")}>
              <SiGitea className="h-4 w-4" />
              <p className="text-sm">
                Go to Repository
              </p>
            </Button>
          </div>
        ) : (
          <CreateRepoForm
            onSubmitSuccess={handleFormSubmit}
            isLoading={loading}
            gitUser={gitUser}
            setCurrentRepoName={setCurrentRepoName}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreateRepo