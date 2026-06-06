type ProfileFormValues = {
  employeeId: string;
  actorUserId: string;
  targetUserId: string;
  legalFirstName: string;
  legalLastName: string;
  preferredName: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bio: string;
  phoneVisible: boolean;
  bioVisible: boolean;
};

type ProfileFormProps = {
  action?: (formData: FormData) => void | Promise<void>;
  defaultValues?: Partial<ProfileFormValues>;
  submitLabel?: string;
};

export function ProfileForm({
  action,
  defaultValues,
  submitLabel = "Save profile",
}: ProfileFormProps) {
  return (
    <form
      action={action}
      className="grid gap-6 rounded-3xl border border-[--color-border] bg-[--color-panel] p-6"
    >
      <input
        type="hidden"
        name="employeeId"
        defaultValue={defaultValues?.employeeId ?? ""}
      />
      <input
        type="hidden"
        name="actorUserId"
        defaultValue={defaultValues?.actorUserId ?? ""}
      />
      <input
        type="hidden"
        name="targetUserId"
        defaultValue={defaultValues?.targetUserId ?? ""}
      />
      <input
        type="hidden"
        name="legalFirstName"
        defaultValue={defaultValues?.legalFirstName ?? ""}
      />
      <input
        type="hidden"
        name="legalLastName"
        defaultValue={defaultValues?.legalLastName ?? ""}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Preferred name
          <input
            name="preferredName"
            defaultValue={defaultValues?.preferredName ?? ""}
            placeholder="Preferred name"
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Phone
          <input
            name="phone"
            defaultValue={defaultValues?.phone ?? ""}
            placeholder="Phone"
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        Address
        <textarea
          name="address"
          defaultValue={defaultValues?.address ?? ""}
          placeholder="Address"
          className="min-h-24 rounded-2xl border border-[--color-border] bg-white px-4 py-3"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm">
          Emergency contact name
          <input
            name="emergencyContactName"
            defaultValue={defaultValues?.emergencyContactName ?? ""}
            placeholder="Emergency contact name"
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Emergency contact phone
          <input
            name="emergencyContactPhone"
            defaultValue={defaultValues?.emergencyContactPhone ?? ""}
            placeholder="Emergency contact phone"
            className="rounded-2xl border border-[--color-border] bg-white px-4 py-3"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        Bio
        <textarea
          name="bio"
          defaultValue={defaultValues?.bio ?? ""}
          placeholder="Bio"
          className="min-h-32 rounded-2xl border border-[--color-border] bg-white px-4 py-3"
        />
      </label>

      <div className="grid gap-3 rounded-2xl border border-[--color-border] bg-white p-4 text-sm">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="phoneVisible"
            defaultChecked={defaultValues?.phoneVisible ?? true}
          />
          Show phone in public profile
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="bioVisible"
            defaultChecked={defaultValues?.bioVisible ?? true}
          />
          Show bio in public profile
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-full bg-[--color-fg] px-5 py-3 text-sm font-semibold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
