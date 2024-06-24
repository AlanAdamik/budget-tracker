<script lang="ts">
    import CurrencySelect from "../common/CurrencySelect.svelte"
    import Avatar from "../ui/avatar/avatar.svelte"
    import Button from "../ui/button/button.svelte"
    import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
    import DialogDescription from "../ui/dialog/dialog-description.svelte"
    import DialogFooter from "../ui/dialog/dialog-footer.svelte"
    import DialogTitle from "../ui/dialog/dialog-title.svelte"
    import Input from "../ui/input/input.svelte"
    import { page } from "$app/stores"
    import BankNameSelect from "$lib/components/common/BankNameSelect.svelte"
    import { trpc } from "$lib/trpc/client"
    import type { BankName } from "$lib/trpc/types/bank-name"
    import type { Currency } from "$lib/trpc/types/currency"
    import CirclePlus from "lucide-svelte/icons/circle-plus";

    export let workspaceId: string;

    let name: string = ""
    let bankName: BankName = "BOURSORAMA"
    let currency: Currency = "EUR"
    
    let client = trpc($page);
    let bankAccountCreateMutation = client.bankAccount.create.createMutation();
    let utils = client.createUtils();

    const handleCreateAccount = async () => {
        $bankAccountCreateMutation.mutateAsync({ name, workspaceId, bankName, currency }).then(() => {
            utils.workspace.findOne.invalidate({ workspaceId: workspaceId });
            utils.workspace.findAllAccessible.invalidate();
        })
    }
</script>
<Dialog>
    <DialogTrigger class="hover:bg-secondary hover:text-secondary-foreground rounded-full">
        <CirclePlus class="w-6 h-6" />
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Create an account
            </DialogTitle>
            <DialogDescription>
                Add a new bank account to this workspace 
            </DialogDescription>
        </DialogHeader>

        <Input placeholder="Account name" type="text" bind:value={name} />
        <BankNameSelect bind:value={bankName} />
        <CurrencySelect bind:value={currency} />
        <DialogFooter>
            <DialogClose asChild let:builder>
                <Button builders={[builder]} on:click={handleCreateAccount}>
                    Create
                </Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
</Dialog>