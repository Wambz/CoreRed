-- Create the storage bucket for blog cover images
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true) on conflict (id) do nothing;
-- Allow public read access to the bucket
create policy "Public Access" on storage.objects for
select using (bucket_id = 'blog-covers');
-- Allow authenticated users to upload new files
create policy "Authenticated users can upload" on storage.objects for
insert with check (
        bucket_id = 'blog-covers'
        and auth.role() = 'authenticated'
    );
-- Allow authenticated users to update their files
create policy "Authenticated users can update" on storage.objects for
update with check (
        bucket_id = 'blog-covers'
        and auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete files
create policy "Authenticated users can delete" on storage.objects for delete using (
    bucket_id = 'blog-covers'
    and auth.role() = 'authenticated'
);