"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Check,
  ChevronsUpDown,
  Download,
  AlertCircle,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Repo } from "@/components/cards/dashboard/git/MyRepos"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { getBranches, BranchesResponse, getArchive } from "@/util/git-client"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

type ArchiveResponse = {
  archiveLink: string
  error?: undefined
} | {
  archiveLink?: undefined
  error: string
}

interface Branch {
  value: string
}

function BranchSelector({ branches, branch: selectedBranchProp, setBranch, useFallback, setDlUrl, repo, fileEx }: { branches: Branch[], branch: Branch, setBranch: (branchValue: string) => void, useFallback: boolean, setDlUrl: (dlUrl: string) => void, repo: Repo, fileEx: string }) {
  const [open, setOpen] = React.useState(false)

  if (useFallback) {
    return (
      <Input type="text" value={selectedBranchProp.value} onChange={(e) => setBranch(e.target.value)} placeholder="Enter branch name" className="w-[200px]" />
    )
  } else {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between cursor-pointer"
          >
            {selectedBranchProp.value
              ? selectedBranchProp.value
              : "Select branch..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search branch..." className="h-9" />
            <CommandList>
              <CommandEmpty>No branch found.</CommandEmpty>
              <CommandGroup>
                {branches.map((itemBranch) => (
                  <CommandItem
                    key={itemBranch.value}
                    onSelect={(currentValue) => {
                      setBranch(currentValue)
                      console.log("Setting to", currentValue)
                      getArchive(repo.name, currentValue, fileEx).then((apiResponse: ArchiveResponse) => {
                        if (apiResponse.error) {
                          console.error("[! getArchive BranchSelector]", apiResponse.error)
                          setDlUrl("")
                        } else if (apiResponse.archiveLink) {
                          console.log("Setting dl link to", apiResponse.archiveLink)
                          setDlUrl(apiResponse.archiveLink)
                        } else {
                          console.error("[! getArchive BranchSelector] No error but no archiveLink defined")
                          setDlUrl("")
                        }
                      })
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    {itemBranch.value}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedBranchProp && selectedBranchProp.value === itemBranch.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
}

export function DownloadArchive({ repo }: { repo: Repo }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [branch, setBranch] = useState("main")
  const [branches, setBranches] = useState<Branch[]>([])
  const [isLoadingBranches, setIsLoadingBranches] = useState(false)
  const [useFallbackBranchSelector, setUseFallbackBranchSelector] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [dlUrl, setDlUrl] = useState("")
  const [fileEx, setFileEx] = useState("zip")

  useEffect(() => {
    setIsLoadingBranches(true)
    setDlUrl("")
    setErrorMessage("")
    setUseFallbackBranchSelector(false)
    setBranches([])
    setFileEx("zip")

    getBranches(repo.name, true).then((apiResponse: BranchesResponse) => {
      setIsLoadingBranches(false)

      if (apiResponse.error) {
        console.error("[! getBranches] Error:", apiResponse.error)
        setErrorMessage(apiResponse.error)
        setUseFallbackBranchSelector(true)
        setBranch("main") 
      } else {
        const fetchedBranchNames: string[] = apiResponse.branches || []
        const mappedDisplayBranches: Branch[] = fetchedBranchNames.map(name => ({ value: name }))

        setBranches(mappedDisplayBranches)
        setUseFallbackBranchSelector(false)
        
        let initialBranch = ""
        if (fetchedBranchNames.length > 0) {
          if (fetchedBranchNames.includes("main")) {
            initialBranch = "main"
          } else if (fetchedBranchNames.includes("master")) {
            initialBranch = "master"
          } else {
            initialBranch = fetchedBranchNames[0]
          }
          setBranch(initialBranch)

          getArchive(repo.name, initialBranch, "zip").then((archiveResponse: ArchiveResponse) => {
             if (archiveResponse.error) {
               console.error("[! getArchive]", archiveResponse.error)
               setDlUrl("")
             } else if (archiveResponse.archiveLink) {
               setDlUrl(archiveResponse.archiveLink)
             } else {
               console.error("[! getArchive] Unexpected response structure:", archiveResponse)
               setDlUrl("")
             }
          })
        } else {
           setErrorMessage("No branches found for this repository.")
           setUseFallbackBranchSelector(true) 
           setBranch("")
        }
      }
    }).catch(error => {
        console.error("[! getBranches]", error)
        setIsLoadingBranches(false)
        setErrorMessage("Failed to fetch branches.")
        setUseFallbackBranchSelector(true)
        setBranch("main")
    })
  }, [repo.name])

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault()
          setIsDialogOpen(true)
        }}
        className="cursor-pointer"
      >
        <ExternalLink className="h-4 w-4" />
        Download Archive
      </DropdownMenuItem>
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        setDlUrl("")
        setBranch("")
        setErrorMessage("")
        setUseFallbackBranchSelector(false)
        setBranches([])
        setFileEx("zip")
      }}>
        <DialogContent closeClassName="absolute right-5.5 top-6.25">
          <DialogHeader>
            <DialogTitle>Download Archive</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            You can download an archive of {repo.name} in a variety of file formats. Please select the options which best suit your needs.
          </DialogDescription>

          {/* a form is not used here YET because nothing needs to be done on
              the server, and we can just use defaults */}
          <div className="flex flex-col gap-4 my-4">
            <Label>Format</Label>
            <Tabs defaultValue="zip" onValueChange={(value) => {
              setFileEx(value)
              getArchive(repo.name, branch, value).then((apiResponse: ArchiveResponse) => {
                if (apiResponse.error) {
                  console.error("[! getArchive Tabs]", apiResponse.error)
                  setDlUrl("")
                } else if (apiResponse.archiveLink) {
                  setDlUrl(apiResponse.archiveLink)
                } else {
                  console.error("[! getArchive Tabs] No error but no archiveLink defined")
                  setDlUrl("")
                }
              })
            }}>
              <TabsList className="w-full">
                <TabsTrigger className="w-full cursor-pointer" value="zip">ZIP</TabsTrigger>
                <TabsTrigger className="w-full cursor-pointer" value="tar.gz">TAR.GZ</TabsTrigger>
                <TabsTrigger className="w-full cursor-pointer" value="bundle">BUNDLE</TabsTrigger>
              </TabsList>
            </Tabs>

            <Label>Branch</Label>
            {useFallbackBranchSelector ? (
              <BranchSelector
                branches={branches}
                branch={{ value: branch }}
                setBranch={setBranch}
                useFallback={useFallbackBranchSelector}
                setDlUrl={setDlUrl}
                repo={repo}
                fileEx={fileEx}
              />
            ) : isLoadingBranches ? (
              <Skeleton className="h-10 w-[200px]" />
            ) : (
              <BranchSelector
                branches={branches}
                branch={{ value: branch }}
                setBranch={setBranch}
                useFallback={useFallbackBranchSelector}
                setDlUrl={setDlUrl}
                repo={repo}
                fileEx={fileEx}
              />
            )}

            {errorMessage && (
              <div className="flex flex-col gap-1 mt-4 text-red-500">
                <div className="flex flex-row gap-2 items-center">
                  <AlertCircle className="h-4 w-4" />
                  <p className="font-bold">{errorMessage}</p>
                </div>
                <p className="text-sm">We couldn&apos;t fetch the branches for this repo automatically.</p>
                <p className="text-sm">Don&apos;t worry, you can still set the branch manually with the box above.</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full cursor-pointer">
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setIsDialogOpen(false)
                window.open(dlUrl, "_blank")
              }}
              className="w-full cursor-pointer"
              disabled={dlUrl === ""}
            >
              <Download />
              Download Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}