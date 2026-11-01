<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Site content (company info, services, nav) lives in src/data/site.ts; pages read from it so details change in one place.
- Enquiry form posts to FormSubmit (src/lib/enquiry.ts) because no backend is enabled; success is shown only on a confirmed response.
