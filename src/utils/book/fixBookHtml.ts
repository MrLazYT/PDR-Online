export default function fixBookHtml(html: string): string {
    return html
        .replaceAll('data-src="/storage', 'data-src="https://green-way.com.ua/storage')
        .replaceAll('src="/storage', 'src="https://green-way.com.ua/storage')
        .replaceAll("background: url('/plugins", "background: url('https://green-way.com.ua/plugins")
        .replaceAll("background:url('/plugins", "background: url('https://green-way.com.ua/plugins")
        .replace(/src="data:image\/gif;base64,[^"]*"/g, "")
        .replaceAll('data-src="https://', 'src="https://')
        .replaceAll(
            /<div id="video[^"]*" data-src="([^"]+)"><\/div>/g,
            '<iframe class="iframe-video" src="https://www.youtube.com/embed/$1?autoplay=1&mute=1&loop=1&playlist=$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>',
        );
}
