globalThis.process = {
  argv: [],
  env: {}
}
var Te = (e, t, a) => {
  if (!t.has(e)) throw TypeError('Cannot ' + a)
}
var u = (e, t, a) => (
    Te(e, t, 'read from private field'), a ? a.call(e) : t.get(e)
  ),
  k = (e, t, a) => {
    if (t.has(e))
      throw TypeError('Cannot add the same private member more than once')
    t instanceof WeakSet ? t.add(e) : t.set(e, a)
  },
  j = (e, t, a, i) => (
    Te(e, t, 'write to private field'), i ? i.call(e, a) : t.set(e, a), a
  )
var z = (e, t, a) => (Te(e, t, 'access private method'), a)
function Ae () {
  ;(this._types = Object.create(null)), (this._extensions = Object.create(null))
  for (let e = 0; e < arguments.length; e++) this.define(arguments[e])
  ;(this.define = this.define.bind(this)),
    (this.getType = this.getType.bind(this)),
    (this.getExtension = this.getExtension.bind(this))
}
Ae.prototype.define = function (e, t) {
  for (let a in e) {
    let i = e[a].map(function (o) {
      return o.toLowerCase()
    })
    a = a.toLowerCase()
    for (let o = 0; o < i.length; o++) {
      let r = i[o]
      if (r[0] !== '*') {
        if (!t && r in this._types)
          throw new Error(
            'Attempt to change mapping for "' +
              r +
              '" extension from "' +
              this._types[r] +
              '" to "' +
              a +
              '". Pass `force=true` to allow this, otherwise remove "' +
              r +
              '" from the list of extensions for "' +
              a +
              '".'
          )
        this._types[r] = a
      }
    }
    if (t || !this._extensions[a]) {
      let o = i[0]
      this._extensions[a] = o[0] !== '*' ? o : o.substr(1)
    }
  }
}
Ae.prototype.getType = function (e) {
  e = String(e)
  let t = e.replace(/^.*[/\\]/, '').toLowerCase(),
    a = t.replace(/^.*\./, '').toLowerCase(),
    i = t.length < e.length
  return ((a.length < t.length - 1 || !i) && this._types[a]) || null
}
Ae.prototype.getExtension = function (e) {
  return (
    (e = /^\s*([^;\s]*)/.test(e) && RegExp.$1),
    (e && this._extensions[e.toLowerCase()]) || null
  )
}
var bn = Ae,
  wn = {
    'application/andrew-inset': ['ez'],
    'application/applixware': ['aw'],
    'application/atom+xml': ['atom'],
    'application/atomcat+xml': ['atomcat'],
    'application/atomdeleted+xml': ['atomdeleted'],
    'application/atomsvc+xml': ['atomsvc'],
    'application/atsc-dwd+xml': ['dwd'],
    'application/atsc-held+xml': ['held'],
    'application/atsc-rsat+xml': ['rsat'],
    'application/bdoc': ['bdoc'],
    'application/calendar+xml': ['xcs'],
    'application/ccxml+xml': ['ccxml'],
    'application/cdfx+xml': ['cdfx'],
    'application/cdmi-capability': ['cdmia'],
    'application/cdmi-container': ['cdmic'],
    'application/cdmi-domain': ['cdmid'],
    'application/cdmi-object': ['cdmio'],
    'application/cdmi-queue': ['cdmiq'],
    'application/cu-seeme': ['cu'],
    'application/dash+xml': ['mpd'],
    'application/davmount+xml': ['davmount'],
    'application/docbook+xml': ['dbk'],
    'application/dssc+der': ['dssc'],
    'application/dssc+xml': ['xdssc'],
    'application/ecmascript': ['es', 'ecma'],
    'application/emma+xml': ['emma'],
    'application/emotionml+xml': ['emotionml'],
    'application/epub+zip': ['epub'],
    'application/exi': ['exi'],
    'application/express': ['exp'],
    'application/fdt+xml': ['fdt'],
    'application/font-tdpfr': ['pfr'],
    'application/geo+json': ['geojson'],
    'application/gml+xml': ['gml'],
    'application/gpx+xml': ['gpx'],
    'application/gxf': ['gxf'],
    'application/gzip': ['gz'],
    'application/hjson': ['hjson'],
    'application/hyperstudio': ['stk'],
    'application/inkml+xml': ['ink', 'inkml'],
    'application/ipfix': ['ipfix'],
    'application/its+xml': ['its'],
    'application/java-archive': ['jar', 'war', 'ear'],
    'application/java-serialized-object': ['ser'],
    'application/java-vm': ['class'],
    'application/javascript': ['js', 'mjs'],
    'application/json': ['json', 'map'],
    'application/json5': ['json5'],
    'application/jsonml+json': ['jsonml'],
    'application/ld+json': ['jsonld'],
    'application/lgr+xml': ['lgr'],
    'application/lost+xml': ['lostxml'],
    'application/mac-binhex40': ['hqx'],
    'application/mac-compactpro': ['cpt'],
    'application/mads+xml': ['mads'],
    'application/manifest+json': ['webmanifest'],
    'application/marc': ['mrc'],
    'application/marcxml+xml': ['mrcx'],
    'application/mathematica': ['ma', 'nb', 'mb'],
    'application/mathml+xml': ['mathml'],
    'application/mbox': ['mbox'],
    'application/mediaservercontrol+xml': ['mscml'],
    'application/metalink+xml': ['metalink'],
    'application/metalink4+xml': ['meta4'],
    'application/mets+xml': ['mets'],
    'application/mmt-aei+xml': ['maei'],
    'application/mmt-usd+xml': ['musd'],
    'application/mods+xml': ['mods'],
    'application/mp21': ['m21', 'mp21'],
    'application/mp4': ['mp4s', 'm4p'],
    'application/msword': ['doc', 'dot'],
    'application/mxf': ['mxf'],
    'application/n-quads': ['nq'],
    'application/n-triples': ['nt'],
    'application/node': ['cjs'],
    'application/octet-stream': [
      'bin',
      'dms',
      'lrf',
      'mar',
      'so',
      'dist',
      'distz',
      'pkg',
      'bpk',
      'dump',
      'elc',
      'deploy',
      'exe',
      'dll',
      'deb',
      'dmg',
      'iso',
      'img',
      'msi',
      'msp',
      'msm',
      'buffer'
    ],
    'application/oda': ['oda'],
    'application/oebps-package+xml': ['opf'],
    'application/ogg': ['ogx'],
    'application/omdoc+xml': ['omdoc'],
    'application/onenote': ['onetoc', 'onetoc2', 'onetmp', 'onepkg'],
    'application/oxps': ['oxps'],
    'application/p2p-overlay+xml': ['relo'],
    'application/patch-ops-error+xml': ['xer'],
    'application/pdf': ['pdf'],
    'application/pgp-encrypted': ['pgp'],
    'application/pgp-signature': ['asc', 'sig'],
    'application/pics-rules': ['prf'],
    'application/pkcs10': ['p10'],
    'application/pkcs7-mime': ['p7m', 'p7c'],
    'application/pkcs7-signature': ['p7s'],
    'application/pkcs8': ['p8'],
    'application/pkix-attr-cert': ['ac'],
    'application/pkix-cert': ['cer'],
    'application/pkix-crl': ['crl'],
    'application/pkix-pkipath': ['pkipath'],
    'application/pkixcmp': ['pki'],
    'application/pls+xml': ['pls'],
    'application/postscript': ['ai', 'eps', 'ps'],
    'application/provenance+xml': ['provx'],
    'application/pskc+xml': ['pskcxml'],
    'application/raml+yaml': ['raml'],
    'application/rdf+xml': ['rdf', 'owl'],
    'application/reginfo+xml': ['rif'],
    'application/relax-ng-compact-syntax': ['rnc'],
    'application/resource-lists+xml': ['rl'],
    'application/resource-lists-diff+xml': ['rld'],
    'application/rls-services+xml': ['rs'],
    'application/route-apd+xml': ['rapd'],
    'application/route-s-tsid+xml': ['sls'],
    'application/route-usd+xml': ['rusd'],
    'application/rpki-ghostbusters': ['gbr'],
    'application/rpki-manifest': ['mft'],
    'application/rpki-roa': ['roa'],
    'application/rsd+xml': ['rsd'],
    'application/rss+xml': ['rss'],
    'application/rtf': ['rtf'],
    'application/sbml+xml': ['sbml'],
    'application/scvp-cv-request': ['scq'],
    'application/scvp-cv-response': ['scs'],
    'application/scvp-vp-request': ['spq'],
    'application/scvp-vp-response': ['spp'],
    'application/sdp': ['sdp'],
    'application/senml+xml': ['senmlx'],
    'application/sensml+xml': ['sensmlx'],
    'application/set-payment-initiation': ['setpay'],
    'application/set-registration-initiation': ['setreg'],
    'application/shf+xml': ['shf'],
    'application/sieve': ['siv', 'sieve'],
    'application/smil+xml': ['smi', 'smil'],
    'application/sparql-query': ['rq'],
    'application/sparql-results+xml': ['srx'],
    'application/srgs': ['gram'],
    'application/srgs+xml': ['grxml'],
    'application/sru+xml': ['sru'],
    'application/ssdl+xml': ['ssdl'],
    'application/ssml+xml': ['ssml'],
    'application/swid+xml': ['swidtag'],
    'application/tei+xml': ['tei', 'teicorpus'],
    'application/thraud+xml': ['tfi'],
    'application/timestamped-data': ['tsd'],
    'application/toml': ['toml'],
    'application/trig': ['trig'],
    'application/ttml+xml': ['ttml'],
    'application/ubjson': ['ubj'],
    'application/urc-ressheet+xml': ['rsheet'],
    'application/urc-targetdesc+xml': ['td'],
    'application/voicexml+xml': ['vxml'],
    'application/wasm': ['wasm'],
    'application/widget': ['wgt'],
    'application/winhlp': ['hlp'],
    'application/wsdl+xml': ['wsdl'],
    'application/wspolicy+xml': ['wspolicy'],
    'application/xaml+xml': ['xaml'],
    'application/xcap-att+xml': ['xav'],
    'application/xcap-caps+xml': ['xca'],
    'application/xcap-diff+xml': ['xdf'],
    'application/xcap-el+xml': ['xel'],
    'application/xcap-ns+xml': ['xns'],
    'application/xenc+xml': ['xenc'],
    'application/xhtml+xml': ['xhtml', 'xht'],
    'application/xliff+xml': ['xlf'],
    'application/xml': ['xml', 'xsl', 'xsd', 'rng'],
    'application/xml-dtd': ['dtd'],
    'application/xop+xml': ['xop'],
    'application/xproc+xml': ['xpl'],
    'application/xslt+xml': ['*xsl', 'xslt'],
    'application/xspf+xml': ['xspf'],
    'application/xv+xml': ['mxml', 'xhvml', 'xvml', 'xvm'],
    'application/yang': ['yang'],
    'application/yin+xml': ['yin'],
    'application/zip': ['zip'],
    'audio/3gpp': ['*3gpp'],
    'audio/adpcm': ['adp'],
    'audio/amr': ['amr'],
    'audio/basic': ['au', 'snd'],
    'audio/midi': ['mid', 'midi', 'kar', 'rmi'],
    'audio/mobile-xmf': ['mxmf'],
    'audio/mp3': ['*mp3'],
    'audio/mp4': ['m4a', 'mp4a'],
    'audio/mpeg': ['mpga', 'mp2', 'mp2a', 'mp3', 'm2a', 'm3a'],
    'audio/ogg': ['oga', 'ogg', 'spx', 'opus'],
    'audio/s3m': ['s3m'],
    'audio/silk': ['sil'],
    'audio/wav': ['wav'],
    'audio/wave': ['*wav'],
    'audio/webm': ['weba'],
    'audio/xm': ['xm'],
    'font/collection': ['ttc'],
    'font/otf': ['otf'],
    'font/ttf': ['ttf'],
    'font/woff': ['woff'],
    'font/woff2': ['woff2'],
    'image/aces': ['exr'],
    'image/apng': ['apng'],
    'image/avif': ['avif'],
    'image/bmp': ['bmp'],
    'image/cgm': ['cgm'],
    'image/dicom-rle': ['drle'],
    'image/emf': ['emf'],
    'image/fits': ['fits'],
    'image/g3fax': ['g3'],
    'image/gif': ['gif'],
    'image/heic': ['heic'],
    'image/heic-sequence': ['heics'],
    'image/heif': ['heif'],
    'image/heif-sequence': ['heifs'],
    'image/hej2k': ['hej2'],
    'image/hsj2': ['hsj2'],
    'image/ief': ['ief'],
    'image/jls': ['jls'],
    'image/jp2': ['jp2', 'jpg2'],
    'image/jpeg': ['jpeg', 'jpg', 'jpe'],
    'image/jph': ['jph'],
    'image/jphc': ['jhc'],
    'image/jpm': ['jpm'],
    'image/jpx': ['jpx', 'jpf'],
    'image/jxr': ['jxr'],
    'image/jxra': ['jxra'],
    'image/jxrs': ['jxrs'],
    'image/jxs': ['jxs'],
    'image/jxsc': ['jxsc'],
    'image/jxsi': ['jxsi'],
    'image/jxss': ['jxss'],
    'image/ktx': ['ktx'],
    'image/ktx2': ['ktx2'],
    'image/png': ['png'],
    'image/sgi': ['sgi'],
    'image/svg+xml': ['svg', 'svgz'],
    'image/t38': ['t38'],
    'image/tiff': ['tif', 'tiff'],
    'image/tiff-fx': ['tfx'],
    'image/webp': ['webp'],
    'image/wmf': ['wmf'],
    'message/disposition-notification': ['disposition-notification'],
    'message/global': ['u8msg'],
    'message/global-delivery-status': ['u8dsn'],
    'message/global-disposition-notification': ['u8mdn'],
    'message/global-headers': ['u8hdr'],
    'message/rfc822': ['eml', 'mime'],
    'model/3mf': ['3mf'],
    'model/gltf+json': ['gltf'],
    'model/gltf-binary': ['glb'],
    'model/iges': ['igs', 'iges'],
    'model/mesh': ['msh', 'mesh', 'silo'],
    'model/mtl': ['mtl'],
    'model/obj': ['obj'],
    'model/step+xml': ['stpx'],
    'model/step+zip': ['stpz'],
    'model/step-xml+zip': ['stpxz'],
    'model/stl': ['stl'],
    'model/vrml': ['wrl', 'vrml'],
    'model/x3d+binary': ['*x3db', 'x3dbz'],
    'model/x3d+fastinfoset': ['x3db'],
    'model/x3d+vrml': ['*x3dv', 'x3dvz'],
    'model/x3d+xml': ['x3d', 'x3dz'],
    'model/x3d-vrml': ['x3dv'],
    'text/cache-manifest': ['appcache', 'manifest'],
    'text/calendar': ['ics', 'ifb'],
    'text/coffeescript': ['coffee', 'litcoffee'],
    'text/css': ['css'],
    'text/csv': ['csv'],
    'text/html': ['html', 'htm', 'shtml'],
    'text/jade': ['jade'],
    'text/jsx': ['jsx'],
    'text/less': ['less'],
    'text/markdown': ['markdown', 'md'],
    'text/mathml': ['mml'],
    'text/mdx': ['mdx'],
    'text/n3': ['n3'],
    'text/plain': ['txt', 'text', 'conf', 'def', 'list', 'log', 'in', 'ini'],
    'text/richtext': ['rtx'],
    'text/rtf': ['*rtf'],
    'text/sgml': ['sgml', 'sgm'],
    'text/shex': ['shex'],
    'text/slim': ['slim', 'slm'],
    'text/spdx': ['spdx'],
    'text/stylus': ['stylus', 'styl'],
    'text/tab-separated-values': ['tsv'],
    'text/troff': ['t', 'tr', 'roff', 'man', 'me', 'ms'],
    'text/turtle': ['ttl'],
    'text/uri-list': ['uri', 'uris', 'urls'],
    'text/vcard': ['vcard'],
    'text/vtt': ['vtt'],
    'text/xml': ['*xml'],
    'text/yaml': ['yaml', 'yml'],
    'video/3gpp': ['3gp', '3gpp'],
    'video/3gpp2': ['3g2'],
    'video/h261': ['h261'],
    'video/h263': ['h263'],
    'video/h264': ['h264'],
    'video/iso.segment': ['m4s'],
    'video/jpeg': ['jpgv'],
    'video/jpm': ['*jpm', 'jpgm'],
    'video/mj2': ['mj2', 'mjp2'],
    'video/mp2t': ['ts'],
    'video/mp4': ['mp4', 'mp4v', 'mpg4'],
    'video/mpeg': ['mpeg', 'mpg', 'mpe', 'm1v', 'm2v'],
    'video/ogg': ['ogv'],
    'video/quicktime': ['qt', 'mov'],
    'video/webm': ['webm']
  },
  Sn = {
    'application/prs.cww': ['cww'],
    'application/vnd.1000minds.decision-model+xml': ['1km'],
    'application/vnd.3gpp.pic-bw-large': ['plb'],
    'application/vnd.3gpp.pic-bw-small': ['psb'],
    'application/vnd.3gpp.pic-bw-var': ['pvb'],
    'application/vnd.3gpp2.tcap': ['tcap'],
    'application/vnd.3m.post-it-notes': ['pwn'],
    'application/vnd.accpac.simply.aso': ['aso'],
    'application/vnd.accpac.simply.imp': ['imp'],
    'application/vnd.acucobol': ['acu'],
    'application/vnd.acucorp': ['atc', 'acutc'],
    'application/vnd.adobe.air-application-installer-package+zip': ['air'],
    'application/vnd.adobe.formscentral.fcdt': ['fcdt'],
    'application/vnd.adobe.fxp': ['fxp', 'fxpl'],
    'application/vnd.adobe.xdp+xml': ['xdp'],
    'application/vnd.adobe.xfdf': ['xfdf'],
    'application/vnd.ahead.space': ['ahead'],
    'application/vnd.airzip.filesecure.azf': ['azf'],
    'application/vnd.airzip.filesecure.azs': ['azs'],
    'application/vnd.amazon.ebook': ['azw'],
    'application/vnd.americandynamics.acc': ['acc'],
    'application/vnd.amiga.ami': ['ami'],
    'application/vnd.android.package-archive': ['apk'],
    'application/vnd.anser-web-certificate-issue-initiation': ['cii'],
    'application/vnd.anser-web-funds-transfer-initiation': ['fti'],
    'application/vnd.antix.game-component': ['atx'],
    'application/vnd.apple.installer+xml': ['mpkg'],
    'application/vnd.apple.keynote': ['key'],
    'application/vnd.apple.mpegurl': ['m3u8'],
    'application/vnd.apple.numbers': ['numbers'],
    'application/vnd.apple.pages': ['pages'],
    'application/vnd.apple.pkpass': ['pkpass'],
    'application/vnd.aristanetworks.swi': ['swi'],
    'application/vnd.astraea-software.iota': ['iota'],
    'application/vnd.audiograph': ['aep'],
    'application/vnd.balsamiq.bmml+xml': ['bmml'],
    'application/vnd.blueice.multipass': ['mpm'],
    'application/vnd.bmi': ['bmi'],
    'application/vnd.businessobjects': ['rep'],
    'application/vnd.chemdraw+xml': ['cdxml'],
    'application/vnd.chipnuts.karaoke-mmd': ['mmd'],
    'application/vnd.cinderella': ['cdy'],
    'application/vnd.citationstyles.style+xml': ['csl'],
    'application/vnd.claymore': ['cla'],
    'application/vnd.cloanto.rp9': ['rp9'],
    'application/vnd.clonk.c4group': ['c4g', 'c4d', 'c4f', 'c4p', 'c4u'],
    'application/vnd.cluetrust.cartomobile-config': ['c11amc'],
    'application/vnd.cluetrust.cartomobile-config-pkg': ['c11amz'],
    'application/vnd.commonspace': ['csp'],
    'application/vnd.contact.cmsg': ['cdbcmsg'],
    'application/vnd.cosmocaller': ['cmc'],
    'application/vnd.crick.clicker': ['clkx'],
    'application/vnd.crick.clicker.keyboard': ['clkk'],
    'application/vnd.crick.clicker.palette': ['clkp'],
    'application/vnd.crick.clicker.template': ['clkt'],
    'application/vnd.crick.clicker.wordbank': ['clkw'],
    'application/vnd.criticaltools.wbs+xml': ['wbs'],
    'application/vnd.ctc-posml': ['pml'],
    'application/vnd.cups-ppd': ['ppd'],
    'application/vnd.curl.car': ['car'],
    'application/vnd.curl.pcurl': ['pcurl'],
    'application/vnd.dart': ['dart'],
    'application/vnd.data-vision.rdz': ['rdz'],
    'application/vnd.dbf': ['dbf'],
    'application/vnd.dece.data': ['uvf', 'uvvf', 'uvd', 'uvvd'],
    'application/vnd.dece.ttml+xml': ['uvt', 'uvvt'],
    'application/vnd.dece.unspecified': ['uvx', 'uvvx'],
    'application/vnd.dece.zip': ['uvz', 'uvvz'],
    'application/vnd.denovo.fcselayout-link': ['fe_launch'],
    'application/vnd.dna': ['dna'],
    'application/vnd.dolby.mlp': ['mlp'],
    'application/vnd.dpgraph': ['dpg'],
    'application/vnd.dreamfactory': ['dfac'],
    'application/vnd.ds-keypoint': ['kpxx'],
    'application/vnd.dvb.ait': ['ait'],
    'application/vnd.dvb.service': ['svc'],
    'application/vnd.dynageo': ['geo'],
    'application/vnd.ecowin.chart': ['mag'],
    'application/vnd.enliven': ['nml'],
    'application/vnd.epson.esf': ['esf'],
    'application/vnd.epson.msf': ['msf'],
    'application/vnd.epson.quickanime': ['qam'],
    'application/vnd.epson.salt': ['slt'],
    'application/vnd.epson.ssf': ['ssf'],
    'application/vnd.eszigno3+xml': ['es3', 'et3'],
    'application/vnd.ezpix-album': ['ez2'],
    'application/vnd.ezpix-package': ['ez3'],
    'application/vnd.fdf': ['fdf'],
    'application/vnd.fdsn.mseed': ['mseed'],
    'application/vnd.fdsn.seed': ['seed', 'dataless'],
    'application/vnd.flographit': ['gph'],
    'application/vnd.fluxtime.clip': ['ftc'],
    'application/vnd.framemaker': ['fm', 'frame', 'maker', 'book'],
    'application/vnd.frogans.fnc': ['fnc'],
    'application/vnd.frogans.ltf': ['ltf'],
    'application/vnd.fsc.weblaunch': ['fsc'],
    'application/vnd.fujitsu.oasys': ['oas'],
    'application/vnd.fujitsu.oasys2': ['oa2'],
    'application/vnd.fujitsu.oasys3': ['oa3'],
    'application/vnd.fujitsu.oasysgp': ['fg5'],
    'application/vnd.fujitsu.oasysprs': ['bh2'],
    'application/vnd.fujixerox.ddd': ['ddd'],
    'application/vnd.fujixerox.docuworks': ['xdw'],
    'application/vnd.fujixerox.docuworks.binder': ['xbd'],
    'application/vnd.fuzzysheet': ['fzs'],
    'application/vnd.genomatix.tuxedo': ['txd'],
    'application/vnd.geogebra.file': ['ggb'],
    'application/vnd.geogebra.tool': ['ggt'],
    'application/vnd.geometry-explorer': ['gex', 'gre'],
    'application/vnd.geonext': ['gxt'],
    'application/vnd.geoplan': ['g2w'],
    'application/vnd.geospace': ['g3w'],
    'application/vnd.gmx': ['gmx'],
    'application/vnd.google-apps.document': ['gdoc'],
    'application/vnd.google-apps.presentation': ['gslides'],
    'application/vnd.google-apps.spreadsheet': ['gsheet'],
    'application/vnd.google-earth.kml+xml': ['kml'],
    'application/vnd.google-earth.kmz': ['kmz'],
    'application/vnd.grafeq': ['gqf', 'gqs'],
    'application/vnd.groove-account': ['gac'],
    'application/vnd.groove-help': ['ghf'],
    'application/vnd.groove-identity-message': ['gim'],
    'application/vnd.groove-injector': ['grv'],
    'application/vnd.groove-tool-message': ['gtm'],
    'application/vnd.groove-tool-template': ['tpl'],
    'application/vnd.groove-vcard': ['vcg'],
    'application/vnd.hal+xml': ['hal'],
    'application/vnd.handheld-entertainment+xml': ['zmm'],
    'application/vnd.hbci': ['hbci'],
    'application/vnd.hhe.lesson-player': ['les'],
    'application/vnd.hp-hpgl': ['hpgl'],
    'application/vnd.hp-hpid': ['hpid'],
    'application/vnd.hp-hps': ['hps'],
    'application/vnd.hp-jlyt': ['jlt'],
    'application/vnd.hp-pcl': ['pcl'],
    'application/vnd.hp-pclxl': ['pclxl'],
    'application/vnd.hydrostatix.sof-data': ['sfd-hdstx'],
    'application/vnd.ibm.minipay': ['mpy'],
    'application/vnd.ibm.modcap': ['afp', 'listafp', 'list3820'],
    'application/vnd.ibm.rights-management': ['irm'],
    'application/vnd.ibm.secure-container': ['sc'],
    'application/vnd.iccprofile': ['icc', 'icm'],
    'application/vnd.igloader': ['igl'],
    'application/vnd.immervision-ivp': ['ivp'],
    'application/vnd.immervision-ivu': ['ivu'],
    'application/vnd.insors.igm': ['igm'],
    'application/vnd.intercon.formnet': ['xpw', 'xpx'],
    'application/vnd.intergeo': ['i2g'],
    'application/vnd.intu.qbo': ['qbo'],
    'application/vnd.intu.qfx': ['qfx'],
    'application/vnd.ipunplugged.rcprofile': ['rcprofile'],
    'application/vnd.irepository.package+xml': ['irp'],
    'application/vnd.is-xpr': ['xpr'],
    'application/vnd.isac.fcs': ['fcs'],
    'application/vnd.jam': ['jam'],
    'application/vnd.jcp.javame.midlet-rms': ['rms'],
    'application/vnd.jisp': ['jisp'],
    'application/vnd.joost.joda-archive': ['joda'],
    'application/vnd.kahootz': ['ktz', 'ktr'],
    'application/vnd.kde.karbon': ['karbon'],
    'application/vnd.kde.kchart': ['chrt'],
    'application/vnd.kde.kformula': ['kfo'],
    'application/vnd.kde.kivio': ['flw'],
    'application/vnd.kde.kontour': ['kon'],
    'application/vnd.kde.kpresenter': ['kpr', 'kpt'],
    'application/vnd.kde.kspread': ['ksp'],
    'application/vnd.kde.kword': ['kwd', 'kwt'],
    'application/vnd.kenameaapp': ['htke'],
    'application/vnd.kidspiration': ['kia'],
    'application/vnd.kinar': ['kne', 'knp'],
    'application/vnd.koan': ['skp', 'skd', 'skt', 'skm'],
    'application/vnd.kodak-descriptor': ['sse'],
    'application/vnd.las.las+xml': ['lasxml'],
    'application/vnd.llamagraphics.life-balance.desktop': ['lbd'],
    'application/vnd.llamagraphics.life-balance.exchange+xml': ['lbe'],
    'application/vnd.lotus-1-2-3': ['123'],
    'application/vnd.lotus-approach': ['apr'],
    'application/vnd.lotus-freelance': ['pre'],
    'application/vnd.lotus-notes': ['nsf'],
    'application/vnd.lotus-organizer': ['org'],
    'application/vnd.lotus-screencam': ['scm'],
    'application/vnd.lotus-wordpro': ['lwp'],
    'application/vnd.macports.portpkg': ['portpkg'],
    'application/vnd.mapbox-vector-tile': ['mvt'],
    'application/vnd.mcd': ['mcd'],
    'application/vnd.medcalcdata': ['mc1'],
    'application/vnd.mediastation.cdkey': ['cdkey'],
    'application/vnd.mfer': ['mwf'],
    'application/vnd.mfmp': ['mfm'],
    'application/vnd.micrografx.flo': ['flo'],
    'application/vnd.micrografx.igx': ['igx'],
    'application/vnd.mif': ['mif'],
    'application/vnd.mobius.daf': ['daf'],
    'application/vnd.mobius.dis': ['dis'],
    'application/vnd.mobius.mbk': ['mbk'],
    'application/vnd.mobius.mqy': ['mqy'],
    'application/vnd.mobius.msl': ['msl'],
    'application/vnd.mobius.plc': ['plc'],
    'application/vnd.mobius.txf': ['txf'],
    'application/vnd.mophun.application': ['mpn'],
    'application/vnd.mophun.certificate': ['mpc'],
    'application/vnd.mozilla.xul+xml': ['xul'],
    'application/vnd.ms-artgalry': ['cil'],
    'application/vnd.ms-cab-compressed': ['cab'],
    'application/vnd.ms-excel': ['xls', 'xlm', 'xla', 'xlc', 'xlt', 'xlw'],
    'application/vnd.ms-excel.addin.macroenabled.12': ['xlam'],
    'application/vnd.ms-excel.sheet.binary.macroenabled.12': ['xlsb'],
    'application/vnd.ms-excel.sheet.macroenabled.12': ['xlsm'],
    'application/vnd.ms-excel.template.macroenabled.12': ['xltm'],
    'application/vnd.ms-fontobject': ['eot'],
    'application/vnd.ms-htmlhelp': ['chm'],
    'application/vnd.ms-ims': ['ims'],
    'application/vnd.ms-lrm': ['lrm'],
    'application/vnd.ms-officetheme': ['thmx'],
    'application/vnd.ms-outlook': ['msg'],
    'application/vnd.ms-pki.seccat': ['cat'],
    'application/vnd.ms-pki.stl': ['*stl'],
    'application/vnd.ms-powerpoint': ['ppt', 'pps', 'pot'],
    'application/vnd.ms-powerpoint.addin.macroenabled.12': ['ppam'],
    'application/vnd.ms-powerpoint.presentation.macroenabled.12': ['pptm'],
    'application/vnd.ms-powerpoint.slide.macroenabled.12': ['sldm'],
    'application/vnd.ms-powerpoint.slideshow.macroenabled.12': ['ppsm'],
    'application/vnd.ms-powerpoint.template.macroenabled.12': ['potm'],
    'application/vnd.ms-project': ['mpp', 'mpt'],
    'application/vnd.ms-word.document.macroenabled.12': ['docm'],
    'application/vnd.ms-word.template.macroenabled.12': ['dotm'],
    'application/vnd.ms-works': ['wps', 'wks', 'wcm', 'wdb'],
    'application/vnd.ms-wpl': ['wpl'],
    'application/vnd.ms-xpsdocument': ['xps'],
    'application/vnd.mseq': ['mseq'],
    'application/vnd.musician': ['mus'],
    'application/vnd.muvee.style': ['msty'],
    'application/vnd.mynfc': ['taglet'],
    'application/vnd.neurolanguage.nlu': ['nlu'],
    'application/vnd.nitf': ['ntf', 'nitf'],
    'application/vnd.noblenet-directory': ['nnd'],
    'application/vnd.noblenet-sealer': ['nns'],
    'application/vnd.noblenet-web': ['nnw'],
    'application/vnd.nokia.n-gage.ac+xml': ['*ac'],
    'application/vnd.nokia.n-gage.data': ['ngdat'],
    'application/vnd.nokia.n-gage.symbian.install': ['n-gage'],
    'application/vnd.nokia.radio-preset': ['rpst'],
    'application/vnd.nokia.radio-presets': ['rpss'],
    'application/vnd.novadigm.edm': ['edm'],
    'application/vnd.novadigm.edx': ['edx'],
    'application/vnd.novadigm.ext': ['ext'],
    'application/vnd.oasis.opendocument.chart': ['odc'],
    'application/vnd.oasis.opendocument.chart-template': ['otc'],
    'application/vnd.oasis.opendocument.database': ['odb'],
    'application/vnd.oasis.opendocument.formula': ['odf'],
    'application/vnd.oasis.opendocument.formula-template': ['odft'],
    'application/vnd.oasis.opendocument.graphics': ['odg'],
    'application/vnd.oasis.opendocument.graphics-template': ['otg'],
    'application/vnd.oasis.opendocument.image': ['odi'],
    'application/vnd.oasis.opendocument.image-template': ['oti'],
    'application/vnd.oasis.opendocument.presentation': ['odp'],
    'application/vnd.oasis.opendocument.presentation-template': ['otp'],
    'application/vnd.oasis.opendocument.spreadsheet': ['ods'],
    'application/vnd.oasis.opendocument.spreadsheet-template': ['ots'],
    'application/vnd.oasis.opendocument.text': ['odt'],
    'application/vnd.oasis.opendocument.text-master': ['odm'],
    'application/vnd.oasis.opendocument.text-template': ['ott'],
    'application/vnd.oasis.opendocument.text-web': ['oth'],
    'application/vnd.olpc-sugar': ['xo'],
    'application/vnd.oma.dd2+xml': ['dd2'],
    'application/vnd.openblox.game+xml': ['obgx'],
    'application/vnd.openofficeorg.extension': ['oxt'],
    'application/vnd.openstreetmap.data+xml': ['osm'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      ['pptx'],
    'application/vnd.openxmlformats-officedocument.presentationml.slide': [
      'sldx'
    ],
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow': [
      'ppsx'
    ],
    'application/vnd.openxmlformats-officedocument.presentationml.template': [
      'potx'
    ],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
      'xlsx'
    ],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template': [
      'xltx'
    ],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      'docx'
    ],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template': [
      'dotx'
    ],
    'application/vnd.osgeo.mapguide.package': ['mgp'],
    'application/vnd.osgi.dp': ['dp'],
    'application/vnd.osgi.subsystem': ['esa'],
    'application/vnd.palm': ['pdb', 'pqa', 'oprc'],
    'application/vnd.pawaafile': ['paw'],
    'application/vnd.pg.format': ['str'],
    'application/vnd.pg.osasli': ['ei6'],
    'application/vnd.picsel': ['efif'],
    'application/vnd.pmi.widget': ['wg'],
    'application/vnd.pocketlearn': ['plf'],
    'application/vnd.powerbuilder6': ['pbd'],
    'application/vnd.previewsystems.box': ['box'],
    'application/vnd.proteus.magazine': ['mgz'],
    'application/vnd.publishare-delta-tree': ['qps'],
    'application/vnd.pvi.ptid1': ['ptid'],
    'application/vnd.quark.quarkxpress': [
      'qxd',
      'qxt',
      'qwd',
      'qwt',
      'qxl',
      'qxb'
    ],
    'application/vnd.rar': ['rar'],
    'application/vnd.realvnc.bed': ['bed'],
    'application/vnd.recordare.musicxml': ['mxl'],
    'application/vnd.recordare.musicxml+xml': ['musicxml'],
    'application/vnd.rig.cryptonote': ['cryptonote'],
    'application/vnd.rim.cod': ['cod'],
    'application/vnd.rn-realmedia': ['rm'],
    'application/vnd.rn-realmedia-vbr': ['rmvb'],
    'application/vnd.route66.link66+xml': ['link66'],
    'application/vnd.sailingtracker.track': ['st'],
    'application/vnd.seemail': ['see'],
    'application/vnd.sema': ['sema'],
    'application/vnd.semd': ['semd'],
    'application/vnd.semf': ['semf'],
    'application/vnd.shana.informed.formdata': ['ifm'],
    'application/vnd.shana.informed.formtemplate': ['itp'],
    'application/vnd.shana.informed.interchange': ['iif'],
    'application/vnd.shana.informed.package': ['ipk'],
    'application/vnd.simtech-mindmapper': ['twd', 'twds'],
    'application/vnd.smaf': ['mmf'],
    'application/vnd.smart.teacher': ['teacher'],
    'application/vnd.software602.filler.form+xml': ['fo'],
    'application/vnd.solent.sdkm+xml': ['sdkm', 'sdkd'],
    'application/vnd.spotfire.dxp': ['dxp'],
    'application/vnd.spotfire.sfs': ['sfs'],
    'application/vnd.stardivision.calc': ['sdc'],
    'application/vnd.stardivision.draw': ['sda'],
    'application/vnd.stardivision.impress': ['sdd'],
    'application/vnd.stardivision.math': ['smf'],
    'application/vnd.stardivision.writer': ['sdw', 'vor'],
    'application/vnd.stardivision.writer-global': ['sgl'],
    'application/vnd.stepmania.package': ['smzip'],
    'application/vnd.stepmania.stepchart': ['sm'],
    'application/vnd.sun.wadl+xml': ['wadl'],
    'application/vnd.sun.xml.calc': ['sxc'],
    'application/vnd.sun.xml.calc.template': ['stc'],
    'application/vnd.sun.xml.draw': ['sxd'],
    'application/vnd.sun.xml.draw.template': ['std'],
    'application/vnd.sun.xml.impress': ['sxi'],
    'application/vnd.sun.xml.impress.template': ['sti'],
    'application/vnd.sun.xml.math': ['sxm'],
    'application/vnd.sun.xml.writer': ['sxw'],
    'application/vnd.sun.xml.writer.global': ['sxg'],
    'application/vnd.sun.xml.writer.template': ['stw'],
    'application/vnd.sus-calendar': ['sus', 'susp'],
    'application/vnd.svd': ['svd'],
    'application/vnd.symbian.install': ['sis', 'sisx'],
    'application/vnd.syncml+xml': ['xsm'],
    'application/vnd.syncml.dm+wbxml': ['bdm'],
    'application/vnd.syncml.dm+xml': ['xdm'],
    'application/vnd.syncml.dmddf+xml': ['ddf'],
    'application/vnd.tao.intent-module-archive': ['tao'],
    'application/vnd.tcpdump.pcap': ['pcap', 'cap', 'dmp'],
    'application/vnd.tmobile-livetv': ['tmo'],
    'application/vnd.trid.tpt': ['tpt'],
    'application/vnd.triscape.mxs': ['mxs'],
    'application/vnd.trueapp': ['tra'],
    'application/vnd.ufdl': ['ufd', 'ufdl'],
    'application/vnd.uiq.theme': ['utz'],
    'application/vnd.umajin': ['umj'],
    'application/vnd.unity': ['unityweb'],
    'application/vnd.uoml+xml': ['uoml'],
    'application/vnd.vcx': ['vcx'],
    'application/vnd.visio': ['vsd', 'vst', 'vss', 'vsw'],
    'application/vnd.visionary': ['vis'],
    'application/vnd.vsf': ['vsf'],
    'application/vnd.wap.wbxml': ['wbxml'],
    'application/vnd.wap.wmlc': ['wmlc'],
    'application/vnd.wap.wmlscriptc': ['wmlsc'],
    'application/vnd.webturbo': ['wtb'],
    'application/vnd.wolfram.player': ['nbp'],
    'application/vnd.wordperfect': ['wpd'],
    'application/vnd.wqd': ['wqd'],
    'application/vnd.wt.stf': ['stf'],
    'application/vnd.xara': ['xar'],
    'application/vnd.xfdl': ['xfdl'],
    'application/vnd.yamaha.hv-dic': ['hvd'],
    'application/vnd.yamaha.hv-script': ['hvs'],
    'application/vnd.yamaha.hv-voice': ['hvp'],
    'application/vnd.yamaha.openscoreformat': ['osf'],
    'application/vnd.yamaha.openscoreformat.osfpvg+xml': ['osfpvg'],
    'application/vnd.yamaha.smaf-audio': ['saf'],
    'application/vnd.yamaha.smaf-phrase': ['spf'],
    'application/vnd.yellowriver-custom-menu': ['cmp'],
    'application/vnd.zul': ['zir', 'zirz'],
    'application/vnd.zzazz.deck+xml': ['zaz'],
    'application/x-7z-compressed': ['7z'],
    'application/x-abiword': ['abw'],
    'application/x-ace-compressed': ['ace'],
    'application/x-apple-diskimage': ['*dmg'],
    'application/x-arj': ['arj'],
    'application/x-authorware-bin': ['aab', 'x32', 'u32', 'vox'],
    'application/x-authorware-map': ['aam'],
    'application/x-authorware-seg': ['aas'],
    'application/x-bcpio': ['bcpio'],
    'application/x-bdoc': ['*bdoc'],
    'application/x-bittorrent': ['torrent'],
    'application/x-blorb': ['blb', 'blorb'],
    'application/x-bzip': ['bz'],
    'application/x-bzip2': ['bz2', 'boz'],
    'application/x-cbr': ['cbr', 'cba', 'cbt', 'cbz', 'cb7'],
    'application/x-cdlink': ['vcd'],
    'application/x-cfs-compressed': ['cfs'],
    'application/x-chat': ['chat'],
    'application/x-chess-pgn': ['pgn'],
    'application/x-chrome-extension': ['crx'],
    'application/x-cocoa': ['cco'],
    'application/x-conference': ['nsc'],
    'application/x-cpio': ['cpio'],
    'application/x-csh': ['csh'],
    'application/x-debian-package': ['*deb', 'udeb'],
    'application/x-dgc-compressed': ['dgc'],
    'application/x-director': [
      'dir',
      'dcr',
      'dxr',
      'cst',
      'cct',
      'cxt',
      'w3d',
      'fgd',
      'swa'
    ],
    'application/x-doom': ['wad'],
    'application/x-dtbncx+xml': ['ncx'],
    'application/x-dtbook+xml': ['dtb'],
    'application/x-dtbresource+xml': ['res'],
    'application/x-dvi': ['dvi'],
    'application/x-envoy': ['evy'],
    'application/x-eva': ['eva'],
    'application/x-font-bdf': ['bdf'],
    'application/x-font-ghostscript': ['gsf'],
    'application/x-font-linux-psf': ['psf'],
    'application/x-font-pcf': ['pcf'],
    'application/x-font-snf': ['snf'],
    'application/x-font-type1': ['pfa', 'pfb', 'pfm', 'afm'],
    'application/x-freearc': ['arc'],
    'application/x-futuresplash': ['spl'],
    'application/x-gca-compressed': ['gca'],
    'application/x-glulx': ['ulx'],
    'application/x-gnumeric': ['gnumeric'],
    'application/x-gramps-xml': ['gramps'],
    'application/x-gtar': ['gtar'],
    'application/x-hdf': ['hdf'],
    'application/x-httpd-php': ['php'],
    'application/x-install-instructions': ['install'],
    'application/x-iso9660-image': ['*iso'],
    'application/x-iwork-keynote-sffkey': ['*key'],
    'application/x-iwork-numbers-sffnumbers': ['*numbers'],
    'application/x-iwork-pages-sffpages': ['*pages'],
    'application/x-java-archive-diff': ['jardiff'],
    'application/x-java-jnlp-file': ['jnlp'],
    'application/x-keepass2': ['kdbx'],
    'application/x-latex': ['latex'],
    'application/x-lua-bytecode': ['luac'],
    'application/x-lzh-compressed': ['lzh', 'lha'],
    'application/x-makeself': ['run'],
    'application/x-mie': ['mie'],
    'application/x-mobipocket-ebook': ['prc', 'mobi'],
    'application/x-ms-application': ['application'],
    'application/x-ms-shortcut': ['lnk'],
    'application/x-ms-wmd': ['wmd'],
    'application/x-ms-wmz': ['wmz'],
    'application/x-ms-xbap': ['xbap'],
    'application/x-msaccess': ['mdb'],
    'application/x-msbinder': ['obd'],
    'application/x-mscardfile': ['crd'],
    'application/x-msclip': ['clp'],
    'application/x-msdos-program': ['*exe'],
    'application/x-msdownload': ['*exe', '*dll', 'com', 'bat', '*msi'],
    'application/x-msmediaview': ['mvb', 'm13', 'm14'],
    'application/x-msmetafile': ['*wmf', '*wmz', '*emf', 'emz'],
    'application/x-msmoney': ['mny'],
    'application/x-mspublisher': ['pub'],
    'application/x-msschedule': ['scd'],
    'application/x-msterminal': ['trm'],
    'application/x-mswrite': ['wri'],
    'application/x-netcdf': ['nc', 'cdf'],
    'application/x-ns-proxy-autoconfig': ['pac'],
    'application/x-nzb': ['nzb'],
    'application/x-perl': ['pl', 'pm'],
    'application/x-pilot': ['*prc', '*pdb'],
    'application/x-pkcs12': ['p12', 'pfx'],
    'application/x-pkcs7-certificates': ['p7b', 'spc'],
    'application/x-pkcs7-certreqresp': ['p7r'],
    'application/x-rar-compressed': ['*rar'],
    'application/x-redhat-package-manager': ['rpm'],
    'application/x-research-info-systems': ['ris'],
    'application/x-sea': ['sea'],
    'application/x-sh': ['sh'],
    'application/x-shar': ['shar'],
    'application/x-shockwave-flash': ['swf'],
    'application/x-silverlight-app': ['xap'],
    'application/x-sql': ['sql'],
    'application/x-stuffit': ['sit'],
    'application/x-stuffitx': ['sitx'],
    'application/x-subrip': ['srt'],
    'application/x-sv4cpio': ['sv4cpio'],
    'application/x-sv4crc': ['sv4crc'],
    'application/x-t3vm-image': ['t3'],
    'application/x-tads': ['gam'],
    'application/x-tar': ['tar'],
    'application/x-tcl': ['tcl', 'tk'],
    'application/x-tex': ['tex'],
    'application/x-tex-tfm': ['tfm'],
    'application/x-texinfo': ['texinfo', 'texi'],
    'application/x-tgif': ['*obj'],
    'application/x-ustar': ['ustar'],
    'application/x-virtualbox-hdd': ['hdd'],
    'application/x-virtualbox-ova': ['ova'],
    'application/x-virtualbox-ovf': ['ovf'],
    'application/x-virtualbox-vbox': ['vbox'],
    'application/x-virtualbox-vbox-extpack': ['vbox-extpack'],
    'application/x-virtualbox-vdi': ['vdi'],
    'application/x-virtualbox-vhd': ['vhd'],
    'application/x-virtualbox-vmdk': ['vmdk'],
    'application/x-wais-source': ['src'],
    'application/x-web-app-manifest+json': ['webapp'],
    'application/x-x509-ca-cert': ['der', 'crt', 'pem'],
    'application/x-xfig': ['fig'],
    'application/x-xliff+xml': ['*xlf'],
    'application/x-xpinstall': ['xpi'],
    'application/x-xz': ['xz'],
    'application/x-zmachine': ['z1', 'z2', 'z3', 'z4', 'z5', 'z6', 'z7', 'z8'],
    'audio/vnd.dece.audio': ['uva', 'uvva'],
    'audio/vnd.digital-winds': ['eol'],
    'audio/vnd.dra': ['dra'],
    'audio/vnd.dts': ['dts'],
    'audio/vnd.dts.hd': ['dtshd'],
    'audio/vnd.lucent.voice': ['lvp'],
    'audio/vnd.ms-playready.media.pya': ['pya'],
    'audio/vnd.nuera.ecelp4800': ['ecelp4800'],
    'audio/vnd.nuera.ecelp7470': ['ecelp7470'],
    'audio/vnd.nuera.ecelp9600': ['ecelp9600'],
    'audio/vnd.rip': ['rip'],
    'audio/x-aac': ['aac'],
    'audio/x-aiff': ['aif', 'aiff', 'aifc'],
    'audio/x-caf': ['caf'],
    'audio/x-flac': ['flac'],
    'audio/x-m4a': ['*m4a'],
    'audio/x-matroska': ['mka'],
    'audio/x-mpegurl': ['m3u'],
    'audio/x-ms-wax': ['wax'],
    'audio/x-ms-wma': ['wma'],
    'audio/x-pn-realaudio': ['ram', 'ra'],
    'audio/x-pn-realaudio-plugin': ['rmp'],
    'audio/x-realaudio': ['*ra'],
    'audio/x-wav': ['*wav'],
    'chemical/x-cdx': ['cdx'],
    'chemical/x-cif': ['cif'],
    'chemical/x-cmdf': ['cmdf'],
    'chemical/x-cml': ['cml'],
    'chemical/x-csml': ['csml'],
    'chemical/x-xyz': ['xyz'],
    'image/prs.btif': ['btif'],
    'image/prs.pti': ['pti'],
    'image/vnd.adobe.photoshop': ['psd'],
    'image/vnd.airzip.accelerator.azv': ['azv'],
    'image/vnd.dece.graphic': ['uvi', 'uvvi', 'uvg', 'uvvg'],
    'image/vnd.djvu': ['djvu', 'djv'],
    'image/vnd.dvb.subtitle': ['*sub'],
    'image/vnd.dwg': ['dwg'],
    'image/vnd.dxf': ['dxf'],
    'image/vnd.fastbidsheet': ['fbs'],
    'image/vnd.fpx': ['fpx'],
    'image/vnd.fst': ['fst'],
    'image/vnd.fujixerox.edmics-mmr': ['mmr'],
    'image/vnd.fujixerox.edmics-rlc': ['rlc'],
    'image/vnd.microsoft.icon': ['ico'],
    'image/vnd.ms-dds': ['dds'],
    'image/vnd.ms-modi': ['mdi'],
    'image/vnd.ms-photo': ['wdp'],
    'image/vnd.net-fpx': ['npx'],
    'image/vnd.pco.b16': ['b16'],
    'image/vnd.tencent.tap': ['tap'],
    'image/vnd.valve.source.texture': ['vtf'],
    'image/vnd.wap.wbmp': ['wbmp'],
    'image/vnd.xiff': ['xif'],
    'image/vnd.zbrush.pcx': ['pcx'],
    'image/x-3ds': ['3ds'],
    'image/x-cmu-raster': ['ras'],
    'image/x-cmx': ['cmx'],
    'image/x-freehand': ['fh', 'fhc', 'fh4', 'fh5', 'fh7'],
    'image/x-icon': ['*ico'],
    'image/x-jng': ['jng'],
    'image/x-mrsid-image': ['sid'],
    'image/x-ms-bmp': ['*bmp'],
    'image/x-pcx': ['*pcx'],
    'image/x-pict': ['pic', 'pct'],
    'image/x-portable-anymap': ['pnm'],
    'image/x-portable-bitmap': ['pbm'],
    'image/x-portable-graymap': ['pgm'],
    'image/x-portable-pixmap': ['ppm'],
    'image/x-rgb': ['rgb'],
    'image/x-tga': ['tga'],
    'image/x-xbitmap': ['xbm'],
    'image/x-xpixmap': ['xpm'],
    'image/x-xwindowdump': ['xwd'],
    'message/vnd.wfa.wsc': ['wsc'],
    'model/vnd.collada+xml': ['dae'],
    'model/vnd.dwf': ['dwf'],
    'model/vnd.gdl': ['gdl'],
    'model/vnd.gtw': ['gtw'],
    'model/vnd.mts': ['mts'],
    'model/vnd.opengex': ['ogex'],
    'model/vnd.parasolid.transmit.binary': ['x_b'],
    'model/vnd.parasolid.transmit.text': ['x_t'],
    'model/vnd.sap.vds': ['vds'],
    'model/vnd.usdz+zip': ['usdz'],
    'model/vnd.valve.source.compiled-map': ['bsp'],
    'model/vnd.vtu': ['vtu'],
    'text/prs.lines.tag': ['dsc'],
    'text/vnd.curl': ['curl'],
    'text/vnd.curl.dcurl': ['dcurl'],
    'text/vnd.curl.mcurl': ['mcurl'],
    'text/vnd.curl.scurl': ['scurl'],
    'text/vnd.dvb.subtitle': ['sub'],
    'text/vnd.fly': ['fly'],
    'text/vnd.fmi.flexstor': ['flx'],
    'text/vnd.graphviz': ['gv'],
    'text/vnd.in3d.3dml': ['3dml'],
    'text/vnd.in3d.spot': ['spot'],
    'text/vnd.sun.j2me.app-descriptor': ['jad'],
    'text/vnd.wap.wml': ['wml'],
    'text/vnd.wap.wmlscript': ['wmls'],
    'text/x-asm': ['s', 'asm'],
    'text/x-c': ['c', 'cc', 'cxx', 'cpp', 'h', 'hh', 'dic'],
    'text/x-component': ['htc'],
    'text/x-fortran': ['f', 'for', 'f77', 'f90'],
    'text/x-handlebars-template': ['hbs'],
    'text/x-java-source': ['java'],
    'text/x-lua': ['lua'],
    'text/x-markdown': ['mkd'],
    'text/x-nfo': ['nfo'],
    'text/x-opml': ['opml'],
    'text/x-org': ['*org'],
    'text/x-pascal': ['p', 'pas'],
    'text/x-processing': ['pde'],
    'text/x-sass': ['sass'],
    'text/x-scss': ['scss'],
    'text/x-setext': ['etx'],
    'text/x-sfv': ['sfv'],
    'text/x-suse-ymp': ['ymp'],
    'text/x-uuencode': ['uu'],
    'text/x-vcalendar': ['vcs'],
    'text/x-vcard': ['vcf'],
    'video/vnd.dece.hd': ['uvh', 'uvvh'],
    'video/vnd.dece.mobile': ['uvm', 'uvvm'],
    'video/vnd.dece.pd': ['uvp', 'uvvp'],
    'video/vnd.dece.sd': ['uvs', 'uvvs'],
    'video/vnd.dece.video': ['uvv', 'uvvv'],
    'video/vnd.dvb.file': ['dvb'],
    'video/vnd.fvt': ['fvt'],
    'video/vnd.mpegurl': ['mxu', 'm4u'],
    'video/vnd.ms-playready.media.pyv': ['pyv'],
    'video/vnd.uvvu.mp4': ['uvu', 'uvvu'],
    'video/vnd.vivo': ['viv'],
    'video/x-f4v': ['f4v'],
    'video/x-fli': ['fli'],
    'video/x-flv': ['flv'],
    'video/x-m4v': ['m4v'],
    'video/x-matroska': ['mkv', 'mk3d', 'mks'],
    'video/x-mng': ['mng'],
    'video/x-ms-asf': ['asf', 'asx'],
    'video/x-ms-vob': ['vob'],
    'video/x-ms-wm': ['wm'],
    'video/x-ms-wmv': ['wmv'],
    'video/x-ms-wmx': ['wmx'],
    'video/x-ms-wvx': ['wvx'],
    'video/x-msvideo': ['avi'],
    'video/x-sgi-movie': ['movie'],
    'video/x-smv': ['smv'],
    'x-conference/x-cooltalk': ['ice']
  },
  kn = bn,
  An = new kn(wn, Sn)
var En = Cn,
  dt = Fn,
  jn = Object.prototype.toString,
  fe = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
function Cn (e, t) {
  if (typeof e != 'string') throw new TypeError('argument str must be a string')
  for (var a = {}, i = t || {}, o = i.decode || $n, r = 0; r < e.length; ) {
    var n = e.indexOf('=', r)
    if (n === -1) break
    var p = e.indexOf(';', r)
    if (p === -1) p = e.length
    else if (p < n) {
      r = e.lastIndexOf(';', n - 1) + 1
      continue
    }
    var c = e.slice(r, n).trim()
    if (a[c] === void 0) {
      var l = e.slice(n + 1, p).trim()
      l.charCodeAt(0) === 34 && (l = l.slice(1, -1)), (a[c] = Nn(l, o))
    }
    r = p + 1
  }
  return a
}
function Fn (e, t, a) {
  var i = a || {},
    o = i.encode || Pn
  if (typeof o != 'function') throw new TypeError('option encode is invalid')
  if (!fe.test(e)) throw new TypeError('argument name is invalid')
  var r = o(t)
  if (r && !fe.test(r)) throw new TypeError('argument val is invalid')
  var n = e + '=' + r
  if (i.maxAge != null) {
    var p = i.maxAge - 0
    if (isNaN(p) || !isFinite(p))
      throw new TypeError('option maxAge is invalid')
    n += '; Max-Age=' + Math.floor(p)
  }
  if (i.domain) {
    if (!fe.test(i.domain)) throw new TypeError('option domain is invalid')
    n += '; Domain=' + i.domain
  }
  if (i.path) {
    if (!fe.test(i.path)) throw new TypeError('option path is invalid')
    n += '; Path=' + i.path
  }
  if (i.expires) {
    var c = i.expires
    if (!Rn(c) || isNaN(c.valueOf()))
      throw new TypeError('option expires is invalid')
    n += '; Expires=' + c.toUTCString()
  }
  if (
    (i.httpOnly && (n += '; HttpOnly'),
    i.secure && (n += '; Secure'),
    i.priority)
  ) {
    var l =
      typeof i.priority == 'string' ? i.priority.toLowerCase() : i.priority
    switch (l) {
      case 'low':
        n += '; Priority=Low'
        break
      case 'medium':
        n += '; Priority=Medium'
        break
      case 'high':
        n += '; Priority=High'
        break
      default:
        throw new TypeError('option priority is invalid')
    }
  }
  if (i.sameSite) {
    var s =
      typeof i.sameSite == 'string' ? i.sameSite.toLowerCase() : i.sameSite
    switch (s) {
      case !0:
        n += '; SameSite=Strict'
        break
      case 'lax':
        n += '; SameSite=Lax'
        break
      case 'strict':
        n += '; SameSite=Strict'
        break
      case 'none':
        n += '; SameSite=None'
        break
      default:
        throw new TypeError('option sameSite is invalid')
    }
  }
  return n
}
function $n (e) {
  return e.indexOf('%') !== -1 ? decodeURIComponent(e) : e
}
function Pn (e) {
  return encodeURIComponent(e)
}
function Rn (e) {
  return jn.call(e) === '[object Date]' || e instanceof Date
}
function Nn (e, t) {
  try {
    return t(e)
  } catch {
    return e
  }
}
var f = {
  UnknownCompilerError: {
    title: 'Unknown compiler error.',
    code: 1e3,
    hint: 'This is almost always a problem with the Astro compiler, not your code. Please open an issue at https://astro.build/issues/compiler.'
  },
  StaticRedirectNotAvailable: {
    title: '`Astro.redirect` is not available in static mode.',
    code: 3001,
    message:
      "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: 'See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR.'
  },
  ClientAddressNotAvailable: {
    title: '`Astro.clientAddress` is not available in current adapter.',
    code: 3002,
    message: e =>
      `\`Astro.clientAddress\` is not available in the \`${e}\` adapter. File an issue with the adapter to add support.`
  },
  StaticClientAddressNotAvailable: {
    title: '`Astro.clientAddress` is not available in static mode.',
    code: 3003,
    message:
      "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: 'See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR.'
  },
  NoMatchingStaticPathFound: {
    title: 'No static path found for requested path.',
    code: 3004,
    message: e =>
      `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${e}\`.`,
    hint: e => `Possible dynamic routes being matched: ${e.join(', ')}.`
  },
  OnlyResponseCanBeReturned: {
    title: 'Invalid type returned by Astro page.',
    code: 3005,
    message: (e, t) =>
      `Route \`${
        e || ''
      }\` returned a \`${t}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
    hint: 'See https://docs.astro.build/en/guides/server-side-rendering/#response for more information.'
  },
  MissingMediaQueryDirective: {
    title: 'Missing value for `client:media` directive.',
    code: 3006,
    message:
      'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
  },
  NoMatchingRenderer: {
    title: 'No matching renderer found.',
    code: 3007,
    message: (e, t, a, i) => `Unable to render \`${e}\`.

${
  i > 0
    ? `There ${a ? 'are.' : 'is.'} ${i} renderer${
        a ? 's.' : ''
      } configured in your \`astro.config.mjs\` file,
but ${a ? 'none were.' : 'it was not.'} able to server-side render \`${e}\`.`
    : `No valid renderer was found ${
        t ? `for the \`.${t}\` file extension.` : 'for this file extension.'
      }`
}`,
    hint: e => `Did you mean to enable the ${e} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
  },
  NoClientEntrypoint: {
    title: 'No client entrypoint specified in renderer.',
    code: 3008,
    message: (e, t, a) =>
      `\`${e}\` component has a \`client:${t}\` directive, but no client entrypoint was provided by \`${a}\`.`,
    hint: 'See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer.'
  },
  NoClientOnlyHint: {
    title: 'Missing hint on client:only directive.',
    code: 3009,
    message: e =>
      `Unable to render \`${e}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
    hint: e =>
      `Did you mean to pass \`client:only="${e}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
  },
  InvalidGetStaticPathParam: {
    title: 'Invalid value returned by a `getStaticPaths` path.',
    code: 3010,
    message: e =>
      `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${e}\``,
    hint: 'See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.'
  },
  InvalidGetStaticPathsReturn: {
    title: 'Invalid value returned by getStaticPaths.',
    code: 3011,
    message: e =>
      `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${e}\``,
    hint: 'See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.'
  },
  GetStaticPathsRemovedRSSHelper: {
    title: 'getStaticPaths RSS helper is not available anymore.',
    code: 3012,
    message:
      'The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.',
    hint: 'See https://docs.astro.build/en/guides/rss/ for more information.'
  },
  GetStaticPathsExpectedParams: {
    title: 'Missing params property on `getStaticPaths` route.',
    code: 3013,
    message:
      'Missing or empty required `params` property on `getStaticPaths` route.',
    hint: 'See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.'
  },
  GetStaticPathsInvalidRouteParam: {
    title: 'Invalid value for `getStaticPaths` route parameter.',
    code: 3014,
    message: (e, t, a) =>
      `Invalid getStaticPaths route parameter for \`${e}\`. Expected undefined, a string or a number, received \`${a}\` (\`${t}\`)`,
    hint: 'See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths.'
  },
  GetStaticPathsRequired: {
    title: '`getStaticPaths()` function required for dynamic routes.',
    code: 3015,
    message:
      '`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.',
    hint: 'See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.\n\nAlternatively, set `output: "server"` in your Astro config file to switch to a non-static server build. This error can also occur if using `export const prerender = true;`.\nSee https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.'
  },
  ReservedSlotName: {
    title: 'Invalid slot name.',
    code: 3016,
    message: e =>
      `Unable to create a slot named \`${e}\`. \`${e}\` is a reserved slot name. Please update the name of this slot.`
  },
  NoAdapterInstalled: {
    title: 'Cannot use Server-side Rendering without an adapter.',
    code: 3017,
    message:
      "Cannot use `output: 'server'` without an adapter. Please install and configure the appropriate server adapter for your final deployment.",
    hint: 'See https://docs.astro.build/en/guides/server-side-rendering/ for more information.'
  },
  NoMatchingImport: {
    title: 'No import found for component.',
    code: 3018,
    message: e =>
      `Could not render \`${e}\`. No matching import has been found for \`${e}\`.`,
    hint: 'Please make sure the component is properly imported.'
  },
  InvalidPrerenderExport: {
    title: 'Invalid prerender export.',
    code: 3019,
    message: (e, t) => {
      let a =
        'A `prerender` export has been detected, but its value cannot be statically analyzed.'
      return (
        e !== 'const' &&
          (a += `
Expected \`const\` declaration but got \`${e}\`.`),
        t !== 'true' &&
          (a += `
Expected \`true\` value but got \`${t}\`.`),
        a
      )
    },
    hint: 'Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`.'
  },
  InvalidComponentArgs: {
    title: 'Invalid component arguments.',
    code: 3020,
    message: e => `Invalid arguments passed to${e ? ` <${e}>` : ''} component.`,
    hint: 'Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`.'
  },
  PageNumberParamNotFound: {
    title: 'Page number param not found.',
    code: 3021,
    message: e =>
      `[paginate()] page number param \`${e}\` not found in your filepath.`,
    hint: 'Rename your file to `[page].astro` or `[...page].astro`.'
  },
  ImageMissingAlt: {
    title: 'Missing alt property.',
    code: 3022,
    message: 'The alt property is required.',
    hint: "The `alt` property is important for the purpose of accessibility, without it users using screen readers or other assistive technologies won't be able to understand what your image is supposed to represent. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-alt for more information."
  },
  InvalidImageService: {
    title: 'Error while loading image service.',
    code: 3023,
    message:
      'There was an error loading the configured image service. Please see the stack trace for more information.'
  },
  MissingImageDimension: {
    title: 'Missing image dimensions',
    code: 3024,
    message: (e, t) =>
      `Missing ${
        e === 'both' ? 'width and height attributes' : `${e} attribute`
      } for ${t}. When using remote images, both dimensions are always required in order to avoid CLS.`,
    hint: 'If your image is inside your `src` folder, you probably meant to import it instead. See [the Imports guide for more information](https://docs.astro.build/en/guides/imports/#other-assets).'
  },
  UnsupportedImageFormat: {
    title: 'Unsupported image format',
    code: 3025,
    message: (e, t, a) =>
      `Received unsupported format \`${e}\` from \`${t}\`. Currently only ${a.join(
        ', '
      )} are supported for optimization.`,
    hint: "If you do not need optimization, using an `img` tag directly instead of the `Image` component might be what you're looking for."
  },
  PrerenderDynamicEndpointPathCollide: {
    title: 'Prerendered dynamic endpoint has path collision.',
    code: 3026,
    message: e =>
      `Could not render \`${e}\` with an \`undefined\` param as the generated path will collide during prerendering. Prevent passing \`undefined\` as \`params\` for the endpoint's \`getStaticPaths()\` function, or add an additional extension to the endpoint's filename.`,
    hint: e =>
      `Rename \`${e}\` to \`${e.replace(/\.(js|ts)/, t => '.json' + t)}\``
  },
  ExpectedImage: {
    title: 'Expected src to be an image.',
    code: 3027,
    message: e =>
      `Expected \`src\` property to be either an ESM imported image or a string with the path of a remote image. Received \`${e}\`.`,
    hint: 'This error can often happen because of a wrong path. Make sure the path to your image is correct.'
  },
  ExpectedImageOptions: {
    title: 'Expected image options.',
    code: 3028,
    message: e =>
      `Expected getImage() parameter to be an object. Received \`${e}\`.`
  },
  MarkdownImageNotFound: {
    title: 'Image not found.',
    code: 3029,
    message: (e, t) =>
      `Could not find requested image \`${e}\`${t ? ` at \`${t}\`.` : '.'}`,
    hint: 'This is often caused by a typo in the image path. Please make sure the file exists, and is spelled correctly.'
  },
  ResponseSentError: {
    title: 'Unable to set response',
    code: 3030,
    message:
      'The response has already been sent to the browser and cannot be altered.'
  },
  UnknownViteError: { title: 'Unknown Vite Error.', code: 4e3 },
  FailedToLoadModuleSSR: {
    title: 'Could not import file.',
    code: 4001,
    message: e => `Could not import \`${e}\`.`,
    hint: 'This is often caused by a typo in the import path. Please make sure the file exists.'
  },
  InvalidGlob: {
    title: 'Invalid glob pattern.',
    code: 4002,
    message: e =>
      `Invalid glob pattern: \`${e}\`. Glob patterns must start with './', '../' or '/'.`,
    hint: 'See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns.'
  },
  UnknownCSSError: { title: 'Unknown CSS Error.', code: 5e3 },
  CSSSyntaxError: { title: 'CSS Syntax Error.', code: 5001 },
  UnknownMarkdownError: { title: 'Unknown Markdown Error.', code: 6e3 },
  MarkdownFrontmatterParseError: {
    title: 'Failed to parse Markdown frontmatter.',
    code: 6001
  },
  InvalidFrontmatterInjectionError: {
    title: 'Invalid frontmatter injection.',
    code: 6003,
    message:
      'A remark or rehype plugin attempted to inject invalid frontmatter. Ensure "astro.frontmatter" is set to a valid JSON object that is not `null` or `undefined`.',
    hint: 'See the frontmatter injection docs https://docs.astro.build/en/guides/markdown-content/#modifying-frontmatter-programmatically for more information.'
  },
  MdxIntegrationMissingError: {
    title: 'MDX integration missing.',
    code: 6004,
    message: e =>
      `Unable to render ${e}. Ensure that the \`@astrojs/mdx\` integration is installed.`,
    hint: 'See the MDX integration docs for installation and usage instructions: https://docs.astro.build/en/guides/integrations-guide/mdx/'
  },
  UnknownConfigError: { title: 'Unknown configuration error.', code: 7e3 },
  ConfigNotFound: {
    title: 'Specified configuration file not found.',
    code: 7001,
    message: e => `Unable to resolve \`--config "${e}"\`. Does the file exist?`
  },
  ConfigLegacyKey: {
    title: 'Legacy configuration detected.',
    code: 7002,
    message: e => `Legacy configuration detected: \`${e}\`.`,
    hint: `Please update your configuration to the new format.
See https://astro.build/config for more information.`
  },
  UnknownCLIError: { title: 'Unknown CLI Error.', code: 8e3 },
  GenerateContentTypesError: {
    title: 'Failed to generate content types.',
    code: 8001,
    message: e =>
      `\`astro sync\` command failed to generate content collection types: ${e}`,
    hint: 'Check your `src/content/config.*` file for typos.'
  },
  UnknownContentCollectionError: {
    title: 'Unknown Content Collection Error.',
    code: 9e3
  },
  InvalidContentEntryFrontmatterError: {
    title: 'Content entry frontmatter does not match schema.',
    code: 9001,
    message: (e, t, a) =>
      [
        `**${String(e)} \u2192 ${String(
          t
        )}** frontmatter does not match collection schema.`,
        ...a.errors.map(i => i.message)
      ].join(`
`),
    hint: 'See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas.'
  },
  InvalidContentEntrySlugError: {
    title: 'Invalid content entry slug.',
    code: 9002,
    message: (e, t) =>
      `${String(e)} \u2192 ${String(
        t
      )} has an invalid slug. \`slug\` must be a string.`,
    hint: 'See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field.'
  },
  ContentSchemaContainsSlugError: {
    title: 'Content Schema should not contain `slug`.',
    code: 9003,
    message: e =>
      `A content collection schema should not contain \`slug\` since it is reserved for slug generation. Remove this from your ${e} collection schema.`,
    hint: 'See https://docs.astro.build/en/guides/content-collections/ for more on the `slug` field.'
  },
  UnknownError: { title: 'Unknown Error.', code: 99999 }
}
function Tn (e) {
  return e.replace(
    /\r\n|\r(?!\n)|\n/g,
    `
`
  )
}
function On (e) {
  let t = Object.entries(f).find(a => a[1].code === e)
  if (t) return { name: t[0], data: t[1] }
}
function zn (e, t) {
  if (!t || t.line === void 0 || t.column === void 0) return ''
  let a = Tn(e)
      .split(
        `
`
      )
      .map(n => n.replace(/\t/g, '  ')),
    i = []
  for (let n = -2; n <= 2; n++) a[t.line + n] && i.push(t.line + n)
  let o = 0
  for (let n of i) {
    let p = `> ${n}`
    p.length > o && (o = p.length)
  }
  let r = ''
  for (let n of i) {
    let p = n === t.line - 1
    ;(r += p ? '> ' : '  '),
      (r += `${n + 1} | ${a[n]}
`),
      p &&
        (r += `${Array.from({ length: o }).join(' ')}  | ${Array.from({
          length: t.column
        }).join(' ')}^
`)
  }
  return r
}
var w = class extends Error {
    constructor (t, ...a) {
      var i
      super(...a), (this.type = 'AstroError')
      let {
        code: o,
        name: r,
        title: n,
        message: p,
        stack: c,
        location: l,
        hint: s,
        frame: d
      } = t
      ;(this.errorCode = o),
        r && r !== 'Error'
          ? (this.name = r)
          : (this.name =
              ((i = On(this.errorCode)) == null ? void 0 : i.name) ??
              'UnknownError'),
        (this.title = n),
        p && (this.message = p),
        (this.stack = c || this.stack),
        (this.loc = l),
        (this.hint = s),
        (this.frame = d)
    }
    setErrorCode (t) {
      this.errorCode = t
    }
    setLocation (t) {
      this.loc = t
    }
    setName (t) {
      this.name = t
    }
    setMessage (t) {
      this.message = t
    }
    setHint (t) {
      this.hint = t
    }
    setFrame (t, a) {
      this.frame = zn(t, a)
    }
    static is (t) {
      return t.type === 'AstroError'
    }
  },
  Mn = new Date(0),
  mt = 'deleted',
  Dn = Symbol.for('astro.responseSent'),
  te = class {
    constructor (t) {
      this.value = t
    }
    json () {
      if (this.value === void 0)
        throw new Error('Cannot convert undefined to an object.')
      return JSON.parse(this.value)
    }
    number () {
      return Number(this.value)
    }
    boolean () {
      return this.value === 'false' || this.value === '0' ? !1 : !!this.value
    }
  },
  J,
  M,
  $,
  ie,
  Be,
  oe,
  qe,
  we,
  zt,
  he = class {
    constructor (t) {
      k(this, ie)
      k(this, oe)
      k(this, we)
      k(this, J, void 0)
      k(this, M, void 0)
      k(this, $, void 0)
      j(this, J, t), j(this, M, null), j(this, $, null)
    }
    delete (t, a) {
      let i = { expires: Mn }
      a?.domain && (i.domain = a.domain),
        a?.path && (i.path = a.path),
        z(this, oe, qe)
          .call(this)
          .set(t, [mt, dt(t, mt, i), !1])
    }
    get (t) {
      if (u(this, $) !== null && u(this, $).has(t)) {
        let [o, , r] = u(this, $).get(t)
        return r ? new te(o) : new te(void 0)
      }
      let i = z(this, ie, Be).call(this)[t]
      return new te(i)
    }
    has (t) {
      if (u(this, $) !== null && u(this, $).has(t)) {
        let [, , i] = u(this, $).get(t)
        return i
      }
      return !!z(this, ie, Be).call(this)[t]
    }
    set (t, a, i) {
      let o
      if (typeof a == 'string') o = a
      else {
        let n = a.toString()
        n === Object.prototype.toString.call(a)
          ? (o = JSON.stringify(a))
          : (o = n)
      }
      let r = {}
      if (
        (i && Object.assign(r, i),
        z(this, oe, qe)
          .call(this)
          .set(t, [o, dt(t, o, r), !0]),
        u(this, J)[Dn])
      )
        throw new w({ ...f.ResponseSentError })
    }
    *headers () {
      if (u(this, $) != null) for (let [, t] of u(this, $)) yield t[1]
    }
  }
;(J = new WeakMap()),
  (M = new WeakMap()),
  ($ = new WeakMap()),
  (ie = new WeakSet()),
  (Be = function () {
    return (
      u(this, M) || z(this, we, zt).call(this),
      u(this, M) || j(this, M, {}),
      u(this, M)
    )
  }),
  (oe = new WeakSet()),
  (qe = function () {
    return u(this, $) || j(this, $, new Map()), u(this, $)
  }),
  (we = new WeakSet()),
  (zt = function () {
    let t = u(this, J).headers.get('cookie')
    t && j(this, M, En(t))
  })
var Mt = Symbol.for('astro.cookies')
function at (e, t) {
  Reflect.set(e, Mt, t)
}
function In (e) {
  let t = Reflect.get(e, Mt)
  if (t != null) return t
}
function* _n (e) {
  let t = In(e)
  if (!t) return []
  for (let a of t.headers()) yield a
  return []
}
function Un (e) {
  return !(e.length !== 3 || !e[0] || typeof e[0] != 'object')
}
function Dt (e, t) {
  var a
  let i =
      ((a = t?.split('/').pop()) == null ? void 0 : a.replace('.astro', '')) ??
      '',
    o = (...r) => {
      if (!Un(r))
        throw new w({
          ...f.InvalidComponentArgs,
          message: f.InvalidComponentArgs.message(i)
        })
      return e(...r)
    }
  return (
    Object.defineProperty(o, 'name', { value: i, writable: !1 }),
    (o.isAstroComponentFactory = !0),
    (o.moduleId = t),
    o
  )
}
function Ln (e) {
  let t = Dt(e.factory, e.moduleId)
  return (t.propagation = e.propagation), t
}
function Ee (e, t) {
  return typeof e == 'function' ? Dt(e, t) : Ln(e)
}
var It = '2.3.1'
function Hn () {
  return (t, a) => {
    let i = [...Object.values(t)]
    if (i.length === 0)
      throw new Error(`Astro.glob(${JSON.stringify(a())}) - no matches found.`)
    return Promise.all(i.map(o => o()))
  }
}
function je (e) {
  return {
    site: e ? new URL(e) : void 0,
    generator: `Astro v${It}`,
    glob: Hn()
  }
}
function Bn (e, t) {
  if (e[t]) return e[t]
  if (t === 'delete' && e.del) return e.del
  if (e.all) return e.all
}
async function qn (e, t, a) {
  var i
  let { request: o, params: r } = t,
    n = (i = o.method) == null ? void 0 : i.toLowerCase(),
    p = Bn(e, n)
  if (
    (!a &&
      a === !1 &&
      n &&
      n !== 'get' &&
      console.warn(`
${n} requests are not available when building a static site. Update your config to output: 'server' to handle ${n} requests.`),
    !p || typeof p != 'function')
  )
    return new Response(null, {
      status: 404,
      headers: { 'X-Astro-Response': 'Not-Found' }
    })
  p.length > 1 &&
    console.warn(`
API routes with 2 arguments have been deprecated. Instead they take a single argument in the form of:

export function get({ params, request }) {
	//...
}

Update your code to remove this warning.`)
  let c = new Proxy(t, {
    get (l, s) {
      return s in l
        ? Reflect.get(l, s)
        : s in r
        ? (console.warn(`
API routes no longer pass params as the first argument. Instead an object containing a params property is provided in the form of:

export function get({ params }) {
	// ...
}

Update your code to remove this warning.`),
          Reflect.get(r, s))
        : void 0
    }
  })
  return p.call(e, c, o)
}
var { replace: Vn } = '',
  Jn = /[&<>'"]/g,
  Wn = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' },
  Gn = e => Wn[e],
  Kn = e => Vn.call(e, Jn, Gn)
function _t (e) {
  let t = {}
  return a(e), Object.keys(t).join(' ')
  function a (i) {
    i && typeof i.forEach == 'function'
      ? i.forEach(a)
      : i === Object(i)
      ? Object.keys(i).forEach(o => {
          i[o] && a(o)
        })
      : ((i = i === !1 || i == null ? '' : String(i).trim()),
        i &&
          i.split(/\s+/).forEach(o => {
            t[o] = !0
          }))
  }
}
function it (e) {
  return !!e && typeof e == 'object' && typeof e.then == 'function'
}
async function* ut (e) {
  let t = e.getReader()
  try {
    for (;;) {
      let { done: a, value: i } = await t.read()
      if (a) return
      yield i
    }
  } finally {
    t.releaseLock()
  }
}
var ne = Kn,
  q = class extends String {
    get [Symbol.toStringTag] () {
      return 'HTMLString'
    }
  },
  v = e => (e instanceof q ? e : typeof e == 'string' ? new q(e) : e)
function ot (e) {
  return Object.prototype.toString.call(e) === '[object HTMLString]'
}
var Ce = 'astro:jsx',
  ft = Symbol('empty'),
  xt = e => e
function ae (e) {
  return e && typeof e == 'object' && e[Ce]
}
function Xn (e) {
  if (typeof e.type == 'string') return e
  let t = {}
  if (ae(e.props.children)) {
    let a = e.props.children
    if (!ae(a) || !('slot' in a.props)) return
    let i = xt(a.props.slot)
    ;(t[i] = [a]),
      (t[i].$$slot = !0),
      delete a.props.slot,
      delete e.props.children
  }
  Array.isArray(e.props.children) &&
    (e.props.children = e.props.children
      .map(a => {
        if (!ae(a) || !('slot' in a.props)) return a
        let i = xt(a.props.slot)
        return (
          Array.isArray(t[i])
            ? t[i].push(a)
            : ((t[i] = [a]), (t[i].$$slot = !0)),
          delete a.props.slot,
          ft
        )
      })
      .filter(a => a !== ft)),
    Object.assign(e.props, t)
}
function Ut (e) {
  return typeof e == 'string' ? v(e) : Array.isArray(e) ? e.map(t => Ut(t)) : e
}
function Yn (e) {
  if ('set:html' in e.props || 'set:text' in e.props) {
    if ('set:html' in e.props) {
      let t = Ut(e.props['set:html'])
      delete e.props['set:html'], Object.assign(e.props, { children: t })
      return
    }
    if ('set:text' in e.props) {
      let t = e.props['set:text']
      delete e.props['set:text'], Object.assign(e.props, { children: t })
      return
    }
  }
}
function Qn (e, t) {
  let a = { [Ge]: 'astro:jsx', [Ce]: !0, type: e, props: t ?? {} }
  return Yn(a), Xn(a), a
}
var Zn =
    '(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));',
  ea =
    '(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));',
  ta =
    '(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));',
  na =
    '(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));',
  aa =
    '(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));',
  ia =
    'var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(`astro:${e}`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}'
function oa (e) {
  return e._metadata.hasHydrationScript
    ? !1
    : (e._metadata.hasHydrationScript = !0)
}
var ht = { idle: Zn, load: ea, only: na, media: ta, visible: aa }
function ra (e, t) {
  return e._metadata.hasDirectives.has(t)
    ? !1
    : (e._metadata.hasDirectives.add(t), !0)
}
function gt (e) {
  if (!(e in ht)) throw new Error(`Unknown directive: ${e}`)
  return ht[e]
}
function sa (e, t) {
  switch (e) {
    case 'both':
      return `<style>astro-island,astro-slot{display:contents}</style><script>${
        gt(t) + ia
      }<\/script>`
    case 'directive':
      return `<script>${gt(t)}<\/script>`
  }
  return ''
}
var rt =
    /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i,
  pa =
    /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i,
  ca = /^(contenteditable|draggable|spellcheck|value)$/i,
  la = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i,
  da = new Set(['set:html', 'set:text']),
  ma = e =>
    e
      .trim()
      .replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (t, a) =>
        /[^\w]|\s/.test(t) ? '' : a === 0 ? t : t.toUpperCase()
      ),
  ee = (e, t = !0) =>
    t ? String(e).replace(/&/g, '&#38;').replace(/"/g, '&#34;') : e,
  Oe = e =>
    e.toLowerCase() === e ? e : e.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`),
  ua = e =>
    Object.entries(e)
      .map(([t, a]) =>
        t[0] !== '-' && t[1] !== '-'
          ? `${Oe(t)}:${a}`
          : Oe(t) !== t
          ? `${Oe(t)}:var(${t});${t}:${a}`
          : `${t}:${a}`
      )
      .join(';')
function fa (e) {
  let t = ''
  for (let [a, i] of Object.entries(e))
    t += `const ${ma(a)} = ${JSON.stringify(i)};
`
  return v(t)
}
function vt (e) {
  return e.length === 1
    ? e[0]
    : `${e.slice(0, -1).join(', ')} or ${e[e.length - 1]}`
}
function de (e, t, a = !0) {
  if (e == null) return ''
  if (e === !1) return ca.test(t) || la.test(t) ? v(` ${t}="false"`) : ''
  if (da.has(t))
    return (
      console.warn(`[astro] The "${t}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${t}={value}\`) instead of the dynamic spread syntax (\`{...{ "${t}": value }}\`).`),
      ''
    )
  if (t === 'class:list') {
    let i = ee(_t(e), a)
    return i === '' ? '' : v(` ${t.slice(0, -5)}="${i}"`)
  }
  return t === 'style' && !(e instanceof q) && typeof e == 'object'
    ? v(` ${t}="${ee(ua(e), a)}"`)
    : t === 'className'
    ? v(` class="${ee(e, a)}"`)
    : e === !0 && (t.startsWith('data-') || pa.test(t))
    ? v(` ${t}`)
    : v(` ${t}="${ee(e, a)}"`)
}
function Ve (e, t = !0) {
  let a = ''
  for (let [i, o] of Object.entries(e)) a += de(o, i, t)
  return v(a)
}
function xe (e, { props: t, children: a = '' }, i = !0) {
  let { lang: o, 'data-astro-id': r, 'define:vars': n, ...p } = t
  return (
    n &&
      (e === 'style' && (delete p['is:global'], delete p['is:scoped']),
      e === 'script' &&
        (delete p.hoist,
        (a =
          fa(n) +
          `
` +
          a))),
    (a == null || a == '') && rt.test(e)
      ? `<${e}${Ve(p, i)} />`
      : `<${e}${Ve(p, i)}>${a}</${e}>`
  )
}
var ze = (e, t, a) => {
  let i = JSON.stringify(e.props),
    o = e.children
  return (
    t === a.findIndex(r => JSON.stringify(r.props) === i && r.children == o)
  )
}
function yt (e) {
  e._metadata.hasRenderedHead = !0
  let t = Array.from(e.styles)
    .filter(ze)
    .map(r => xe('style', r))
  e.styles.clear()
  let a = Array.from(e.scripts)
      .filter(ze)
      .map((r, n) => xe('script', r, !1)),
    o =
      Array.from(e.links)
        .filter(ze)
        .map(r => xe('link', r, !1)).join(`
`) +
      t.join(`
`) +
      a.join(`
`)
  if (e.extraHead.length > 0) for (let r of e.extraHead) o += r
  return v(o)
}
function* Lt (e) {
  yield { type: 'head', result: e }
}
function* Fe (e) {
  e._metadata.hasRenderedHead ||
    (yield { type: 'maybe-head', result: e, scope: e.scope })
}
var xa = Symbol.for('astro.headAndContent')
function $e (e) {
  return typeof e == 'object' && !!e[xa]
}
var bt,
  Ht = Symbol.for('astro.renderTemplateResult'),
  Je = class {
    constructor (t, a) {
      ;(this[bt] = !0),
        (this.htmlParts = t),
        (this.error = void 0),
        (this.expressions = a.map(i =>
          it(i)
            ? Promise.resolve(i).catch(o => {
                if (!this.error) throw ((this.error = o), o)
              })
            : i
        ))
    }
    async *[((bt = Ht), Symbol.asyncIterator)] () {
      let { htmlParts: t, expressions: a } = this
      for (let i = 0; i < t.length; i++) {
        let o = t[i],
          r = a[i]
        yield v(o), yield* K(r)
      }
    }
  }
function Bt (e) {
  return typeof e == 'object' && !!e[Ht]
}
async function* Pe (e) {
  for await (let t of e)
    if (t || t === 0)
      for await (let a of K(t))
        switch (a.type) {
          case 'directive': {
            yield a
            break
          }
          default: {
            yield v(a)
            break
          }
        }
}
function Q (e, ...t) {
  return new Je(e, t)
}
function qt (e) {
  return e == null ? !1 : e.isAstroComponentFactory === !0
}
async function ha (e, t, a, i) {
  let o = await t(e, a, i)
  if (o instanceof Response) throw o
  let r = new Y(),
    n = $e(o) ? o.content : o
  for await (let p of Pe(n)) r.append(p, e)
  return r.toString()
}
function ga (e, t) {
  let a = t.propagation || 'none'
  return (
    t.moduleId &&
      e.componentMetadata.has(t.moduleId) &&
      a === 'none' &&
      (a = e.componentMetadata.get(t.moduleId).propagation),
    a === 'in-tree' || a === 'self'
  )
}
var R = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
}
function Me (e, t = {}, a = new WeakSet()) {
  if (a.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`)
  a.add(e)
  let i = e.map(o => Jt(o, t, a))
  return a.delete(e), i
}
function Vt (e, t = {}, a = new WeakSet()) {
  if (a.has(e))
    throw new Error(`Cyclic reference detected while serializing props for <${t.displayName} client:${t.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`)
  a.add(e)
  let i = Object.fromEntries(
    Object.entries(e).map(([o, r]) => [o, Jt(r, t, a)])
  )
  return a.delete(e), i
}
function Jt (e, t = {}, a = new WeakSet()) {
  switch (Object.prototype.toString.call(e)) {
    case '[object Date]':
      return [R.Date, e.toISOString()]
    case '[object RegExp]':
      return [R.RegExp, e.source]
    case '[object Map]':
      return [R.Map, JSON.stringify(Me(Array.from(e), t, a))]
    case '[object Set]':
      return [R.Set, JSON.stringify(Me(Array.from(e), t, a))]
    case '[object BigInt]':
      return [R.BigInt, e.toString()]
    case '[object URL]':
      return [R.URL, e.toString()]
    case '[object Array]':
      return [R.JSON, JSON.stringify(Me(e, t, a))]
    case '[object Uint8Array]':
      return [R.Uint8Array, JSON.stringify(Array.from(e))]
    case '[object Uint16Array]':
      return [R.Uint16Array, JSON.stringify(Array.from(e))]
    case '[object Uint32Array]':
      return [R.Uint32Array, JSON.stringify(Array.from(e))]
    default:
      return e !== null && typeof e == 'object'
        ? [R.Value, Vt(e, t, a)]
        : [R.Value, e]
  }
}
function Wt (e, t) {
  return JSON.stringify(Vt(e, t))
}
var Gt = ['load', 'idle', 'media', 'visible', 'only'],
  va = new Set(Gt),
  Kt = new Set(Gt.map(e => `client:${e}`))
function ya (e, t) {
  let a = { isPage: !1, hydration: null, props: {} }
  for (let [i, o] of Object.entries(t))
    if (
      (i.startsWith('server:') && i === 'server:root' && (a.isPage = !0),
      i.startsWith('client:'))
    )
      switch (
        (a.hydration ||
          (a.hydration = {
            directive: '',
            value: '',
            componentUrl: '',
            componentExport: { value: '' }
          }),
        i)
      ) {
        case 'client:component-path': {
          a.hydration.componentUrl = o
          break
        }
        case 'client:component-export': {
          a.hydration.componentExport.value = o
          break
        }
        case 'client:component-hydration':
          break
        case 'client:display-name':
          break
        default: {
          if (
            ((a.hydration.directive = i.split(':')[1]),
            (a.hydration.value = o),
            !va.has(a.hydration.directive))
          )
            throw new Error(
              `Error: invalid hydration directive "${i}". Supported hydration methods: ${Array.from(
                Kt
              ).join(', ')}`
            )
          if (
            a.hydration.directive === 'media' &&
            typeof a.hydration.value != 'string'
          )
            throw new w(f.MissingMediaQueryDirective)
          break
        }
      }
    else
      i === 'class:list'
        ? o && (a.props[i.slice(0, -5)] = _t(o))
        : (a.props[i] = o)
  for (let i of Object.getOwnPropertySymbols(t)) a.props[i] = t[i]
  return a
}
async function ba (e, t) {
  let { renderer: a, result: i, astroId: o, props: r, attrs: n } = e,
    { hydrate: p, componentUrl: c, componentExport: l } = t
  if (!l.value)
    throw new Error(
      `Unable to resolve a valid export for "${t.displayName}"! Please open an issue at https://astro.build/issues!`
    )
  let s = { children: '', props: { uid: o } }
  if (n) for (let [m, S] of Object.entries(n)) s.props[m] = ne(S)
  ;(s.props['component-url'] = await i.resolve(decodeURI(c))),
    a.clientEntrypoint &&
      ((s.props['component-export'] = l.value),
      (s.props['renderer-url'] = await i.resolve(
        decodeURI(a.clientEntrypoint)
      )),
      (s.props.props = ne(Wt(r, t)))),
    (s.props.ssr = ''),
    (s.props.client = p)
  let d = await i.resolve('astro:scripts/before-hydration.js')
  return (
    d.length && (s.props['before-hydration-url'] = d),
    (s.props.opts = ne(
      JSON.stringify({ name: t.displayName, value: t.hydrateArgs || '' })
    )),
    s
  )
}
var Xt,
  Yt = Symbol.for('astro.componentInstance'),
  We = class {
    constructor (t, a, i, o) {
      ;(this[Xt] = !0),
        (this.result = t),
        (this.props = a),
        (this.factory = o),
        (this.slotValues = {})
      for (let r in i) {
        let n = i[r](t)
        this.slotValues[r] = () => n
      }
    }
    async init (t) {
      return (
        (this.returnValue = this.factory(t, this.props, this.slotValues)),
        this.returnValue
      )
    }
    async *render () {
      this.returnValue === void 0 && (await this.init(this.result))
      let t = this.returnValue
      it(t) && (t = await t), $e(t) ? yield* t.content : yield* K(t)
    }
  }
Xt = Yt
function wa (e, t) {
  if (e != null)
    for (let a of Object.keys(e))
      Kt.has(a) &&
        console.warn(
          `You are attempting to render <${t} ${a} />, but ${t} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        )
}
function Sa (e, t, a, i, o = {}) {
  wa(i, t)
  let r = new We(e, i, o, a)
  return ga(e, a) && !e.propagators.has(a) && e.propagators.set(a, r), r
}
function st (e) {
  return typeof e == 'object' && !!e[Yt]
}
async function* K (e) {
  if (((e = await e), e instanceof ge))
    e.instructions && (yield* e.instructions), yield e
  else if (ot(e)) yield e
  else if (Array.isArray(e)) for (let t of e) yield v(await K(t))
  else
    typeof e == 'function'
      ? yield* K(e())
      : typeof e == 'string'
      ? yield v(ne(e))
      : (!e && e !== 0) ||
        (Bt(e)
          ? yield* Pe(e)
          : st(e)
          ? yield* e.render()
          : ArrayBuffer.isView(e)
          ? yield e
          : typeof e == 'object' &&
            (Symbol.asyncIterator in e || Symbol.iterator in e)
          ? yield* e
          : yield e)
}
var Qt = Symbol.for('astro:slot-string'),
  ge = class extends q {
    constructor (t, a) {
      super(t), (this.instructions = a), (this[Qt] = !0)
    }
  }
function ka (e) {
  return !!e[Qt]
}
async function* Re (e, t, a) {
  t && (yield* K(typeof t == 'function' ? t(e) : t)),
    a && !t && (yield* Re(e, a))
}
async function X (e, t, a) {
  let i = '',
    o = null,
    r = Re(e, t, a)
  for await (let n of r)
    typeof n.type == 'string' ? (o === null && (o = []), o.push(n)) : (i += n)
  return v(new ge(i, o))
}
async function Zt (e, t = {}) {
  let a = null,
    i = {}
  return (
    t &&
      (await Promise.all(
        Object.entries(t).map(([o, r]) =>
          X(e, r).then(n => {
            n.instructions &&
              (a === null && (a = []), a.push(...n.instructions)),
              (i[o] = n)
          })
        )
      )),
    { slotInstructions: a, children: i }
  )
}
var Aa = Symbol.for('astro:fragment'),
  Ge = Symbol.for('astro:renderer'),
  pt = new TextEncoder(),
  Ea = new TextDecoder()
function me (e, t) {
  if (typeof t.type == 'string') {
    let a = t
    switch (a.type) {
      case 'directive': {
        let { hydration: i } = a,
          o = i && oa(e),
          r = i && ra(e, i.directive),
          n = o ? 'both' : r ? 'directive' : null
        if (n) {
          let p = sa(n, i.directive)
          return v(p)
        } else return ''
      }
      case 'head':
        return e._metadata.hasRenderedHead ? '' : yt(e)
      case 'maybe-head':
        return e._metadata.hasRenderedHead || e._metadata.headInTree
          ? ''
          : yt(e)
    }
  } else {
    if (ka(t)) {
      let a = '',
        i = t
      if (i.instructions) for (let o of i.instructions) a += me(e, o)
      return (a += t.toString()), a
    }
    return t.toString()
  }
}
var Y = class {
  constructor () {
    this.parts = ''
  }
  append (t, a) {
    ArrayBuffer.isView(t)
      ? (this.parts += Ea.decode(t))
      : (this.parts += me(a, t))
  }
  toString () {
    return this.parts
  }
  toArrayBuffer () {
    return pt.encode(this.parts)
  }
}
function ja (e, t) {
  if (t instanceof Uint8Array) return t
  let a = me(e, t)
  return pt.encode(a.toString())
}
var wt = 'astro-client-only',
  _ = class {
    constructor (t) {
      ;(this.vnode = t), (this.count = 0)
    }
    increment () {
      this.count++
    }
    haveNoTried () {
      return this.count === 0
    }
    isCompleted () {
      return this.count > 2
    }
  }
_.symbol = Symbol('astro:jsx:skip')
var Ke,
  ct = 0
async function U (e, t) {
  switch (!0) {
    case t instanceof q:
      return t.toString().trim() === '' ? '' : t
    case typeof t == 'string':
      return v(ne(t))
    case typeof t == 'function':
      return t
    case !t && t !== 0:
      return ''
    case Array.isArray(t):
      return v((await Promise.all(t.map(i => U(e, i)))).join(''))
  }
  let a
  return (
    t.props
      ? t.props[_.symbol]
        ? (a = t.props[_.symbol])
        : (a = new _(t))
      : (a = new _(t)),
    Xe(e, t, a)
  )
}
async function Xe (e, t, a) {
  if (ae(t)) {
    switch (!0) {
      case !t.type:
        throw new Error(`Unable to render ${e._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`)
      case t.type === Symbol.for('astro:fragment'):
        return U(e, t.props.children)
      case t.type.isAstroComponentFactory: {
        let i = {},
          o = {}
        for (let [n, p] of Object.entries(t.props ?? {}))
          n === 'children' || (p && typeof p == 'object' && p.$$slot)
            ? (o[n === 'children' ? 'default' : n] = () => U(e, p))
            : (i[n] = p)
        return v(await ha(e, t.type, i, o))
      }
      case !t.type && t.type !== 0:
        return ''
      case typeof t.type == 'string' && t.type !== wt:
        return v(await Ca(e, t.type, t.props ?? {}))
    }
    if (t.type) {
      let i = function (s) {
        if (Array.isArray(s)) return s.map(d => i(d))
        if (!ae(s)) {
          n.default.push(s)
          return
        }
        if ('slot' in s.props) {
          ;(n[s.props.slot] = [...(n[s.props.slot] ?? []), s]),
            delete s.props.slot
          return
        }
        n.default.push(s)
      }
      if (
        (typeof t.type == 'function' &&
          t.type['astro:renderer'] &&
          a.increment(),
        typeof t.type == 'function' && t.props['server:root'])
      ) {
        let s = await t.type(t.props ?? {})
        return await U(e, s)
      }
      if (typeof t.type == 'function')
        if (a.haveNoTried() || a.isCompleted()) {
          $a()
          try {
            let s = await t.type(t.props ?? {}),
              d
            if (s && s[Ce]) return (d = await Xe(e, s, a)), d
            if (!s) return (d = await Xe(e, s, a)), d
          } catch (s) {
            if (a.isCompleted()) throw s
            a.increment()
          } finally {
            Pa()
          }
        } else a.increment()
      let { children: o = null, ...r } = t.props ?? {},
        n = { default: [] }
      i(o)
      for (let [s, d] of Object.entries(r))
        d.$$slot && ((n[s] = d), delete r[s])
      let p = [],
        c = {}
      for (let [s, d] of Object.entries(n))
        p.push(
          U(e, d).then(m => {
            m.toString().trim().length !== 0 && (c[s] = () => m)
          })
        )
      await Promise.all(p), (r[_.symbol] = a)
      let l
      if (
        (t.type === wt && t.props['client:only']
          ? (l = await kt(e, t.props['client:display-name'] ?? '', null, r, c))
          : (l = await kt(
              e,
              typeof t.type == 'function' ? t.type.name : t.type,
              t.type,
              r,
              c
            )),
        typeof l != 'string' && Symbol.asyncIterator in l)
      ) {
        let s = new Y()
        for await (let d of l) s.append(d, e)
        return v(s.toString())
      } else return v(l)
    }
  }
  return v(`${t}`)
}
async function Ca (e, t, { children: a, ...i }) {
  return v(
    `<${t}${Ka(i)}${v(
      (a == null || a == '') && rt.test(t)
        ? '/>'
        : `>${a == null ? '' : await U(e, Fa(t, a))}</${t}>`
    )}`
  )
}
function Fa (e, t) {
  return typeof t == 'string' && (e === 'style' || e === 'script') ? v(t) : t
}
function $a () {
  if ((ct++, !Ke)) {
    Ke = console.error
    try {
      console.error = Ra
    } catch {}
  }
}
function Pa () {
  ct--
}
function Ra (e, ...t) {
  ;(ct > 0 &&
    typeof e == 'string' &&
    e.includes('Warning: Invalid hook call.') &&
    e.includes('https://reactjs.org/link/invalid-hook-call')) ||
    Ke(e, ...t)
}
var Ye = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY',
  De = Ye.length
function Na (e) {
  let t = 0
  if (e.length === 0) return t
  for (let a = 0; a < e.length; a++) {
    let i = e.charCodeAt(a)
    ;(t = (t << 5) - t + i), (t = t & t)
  }
  return t
}
function Ta (e) {
  let t,
    a = '',
    i = Na(e),
    o = i < 0 ? 'Z' : ''
  for (i = Math.abs(i); i >= De; )
    (t = i % De), (i = Math.floor(i / De)), (a = Ye[t] + a)
  return i > 0 && (a = Ye[i] + a), o + a
}
function Oa (e) {
  return typeof HTMLElement < 'u' && HTMLElement.isPrototypeOf(e)
}
async function za (e, t, a, i) {
  let o = Ma(t),
    r = ''
  for (let n in a) r += ` ${n}="${ee(await a[n])}"`
  return v(`<${o}${r}>${await X(e, i?.default)}</${o}>`)
}
function Ma (e) {
  let t = customElements.getName(e)
  return (
    t ||
    e.name
      .replace(/^HTML|Element$/g, '')
      .replace(/[A-Z]/g, '-$&')
      .toLowerCase()
      .replace(/^-/, 'html-')
  )
}
var St = new Map([['solid', 'solid-js']])
function Da (e) {
  switch (e?.split('.').pop()) {
    case 'svelte':
      return ['@astrojs/svelte']
    case 'vue':
      return ['@astrojs/vue']
    case 'jsx':
    case 'tsx':
      return [
        '@astrojs/react',
        '@astrojs/preact',
        '@astrojs/solid-js',
        '@astrojs/vue (jsx)'
      ]
    default:
      return [
        '@astrojs/react',
        '@astrojs/preact',
        '@astrojs/solid-js',
        '@astrojs/vue',
        '@astrojs/svelte',
        '@astrojs/lit'
      ]
  }
}
function Ia (e) {
  return e === Aa
}
function _a (e) {
  return e && typeof e == 'object' && e['astro:html']
}
async function Ua (e, t, a, i, o = {}) {
  var r, n
  if (!a && !i['client:only'])
    throw new Error(`Unable to render ${t} because it is ${a}!
Did you forget to import the component or is it possible there is a typo?`)
  let { renderers: p } = e._metadata,
    c = { displayName: t },
    { hydration: l, isPage: s, props: d } = ya(t, i),
    m = '',
    S
  l &&
    ((c.hydrate = l.directive),
    (c.hydrateArgs = l.value),
    (c.componentExport = l.componentExport),
    (c.componentUrl = l.componentUrl))
  let h = Da(c.componentUrl),
    b = p.filter(y => y.name !== 'astro:jsx'),
    { children: x, slotInstructions: C } = await Zt(e, o),
    g
  if (c.hydrate !== 'only') {
    let y = !1
    try {
      y = a && a[Ge]
    } catch {}
    if (y) {
      let E = a[Ge]
      g = p.find(({ name: F }) => F === E)
    }
    if (!g) {
      let E
      for (let F of p)
        try {
          if (await F.ssr.check.call({ result: e }, a, d, x)) {
            g = F
            break
          }
        } catch (Ne) {
          E ?? (E = Ne)
        }
      if (!g && E) throw E
    }
    if (!g && typeof HTMLElement == 'function' && Oa(a)) return za(e, a, i, o)
  } else {
    if (c.hydrateArgs) {
      let y = c.hydrateArgs,
        E = St.has(y) ? St.get(y) : y
      g = p.find(({ name: F }) => F === `@astrojs/${E}` || F === E)
    }
    if ((!g && b.length === 1 && (g = b[0]), !g)) {
      let y = (r = c.componentUrl) == null ? void 0 : r.split('.').pop()
      g = p.filter(({ name: E }) => E === `@astrojs/${y}` || E === y)[0]
    }
  }
  if (g)
    c.hydrate === 'only'
      ? (m = await X(e, o?.fallback))
      : ({ html: m, attrs: S } = await g.ssr.renderToStaticMarkup.call(
          { result: e },
          a,
          d,
          x,
          c
        ))
  else {
    if (c.hydrate === 'only')
      throw new w({
        ...f.NoClientOnlyHint,
        message: f.NoClientOnlyHint.message(c.displayName),
        hint: f.NoClientOnlyHint.hint(
          h.map(y => y.replace('@astrojs/', '')).join('|')
        )
      })
    if (typeof a != 'string') {
      let y = b.filter(F => h.includes(F.name)),
        E = b.length > 1
      if (y.length === 0)
        throw new w({
          ...f.NoMatchingRenderer,
          message: f.NoMatchingRenderer.message(
            c.displayName,
            (n = c?.componentUrl) == null ? void 0 : n.split('.').pop(),
            E,
            b.length
          ),
          hint: f.NoMatchingRenderer.hint(vt(h.map(F => '`' + F + '`')))
        })
      if (y.length === 1)
        (g = y[0]),
          ({ html: m, attrs: S } = await g.ssr.renderToStaticMarkup.call(
            { result: e },
            a,
            d,
            x,
            c
          ))
      else
        throw new Error(`Unable to render ${c.displayName}!

This component likely uses ${vt(h)},
but Astro encountered an error during server-side rendering.

Please ensure that ${c.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`)
    }
  }
  if (g && !g.clientEntrypoint && g.name !== '@astrojs/lit' && c.hydrate)
    throw new w({
      ...f.NoClientEntrypoint,
      message: f.NoClientEntrypoint.message(t, c.hydrate, g.name)
    })
  if (!m && typeof a == 'string') {
    let y = La(a),
      E = Object.values(x).join(''),
      F = Pe(
        await Q`<${y}${Ve(d)}${v(
          E === '' && rt.test(y) ? '/>' : `>${E}</${y}>`
        )}`
      )
    m = ''
    for await (let Ne of F) m += Ne
  }
  if (!l)
    return (async function* () {
      C && (yield* C),
        s || g?.name === 'astro:jsx'
          ? yield m
          : m && m.length > 0
          ? yield v(m.replace(/\<\/?astro-slot\>/g, ''))
          : yield ''
    })()
  let A = Ta(`<!--${c.componentExport.value}:${c.componentUrl}-->
${m}
${Wt(d, c)}`),
    P = await ba({ renderer: g, result: e, astroId: A, props: d, attrs: S }, c),
    N = []
  if (m) {
    if (Object.keys(x).length > 0)
      for (let y of Object.keys(x))
        m.includes(
          y === 'default' ? '<astro-slot>' : `<astro-slot name="${y}">`
        ) || N.push(y)
  } else N = Object.keys(x)
  let O =
    N.length > 0
      ? N.map(
          y =>
            `<template data-astro-template${y !== 'default' ? `="${y}"` : ''}>${
              x[y]
            }</template>`
        ).join('')
      : ''
  ;(P.children = `${m ?? ''}${O}`),
    P.children && (P.props['await-children'] = '')
  async function* L () {
    C && (yield* C),
      yield { type: 'directive', hydration: l, result: e },
      yield v(xe('astro-island', P, !1))
  }
  return L()
}
function La (e) {
  let t = /[&<>'"\s]+/g
  return t.test(e) ? e.trim().split(t)[0].trim() : e
}
async function Ha (e, t = {}) {
  let a = await X(e, t?.default)
  return a == null ? a : v(a)
}
async function Ba (e, t, a, i = {}) {
  let { slotInstructions: o, children: r } = await Zt(e, i),
    n = t.render({ slots: r }),
    p = o ? o.map(c => me(e, c)).join('') : ''
  return v(p + n)
}
function I (e, t, a, i, o = {}) {
  return it(a)
    ? Promise.resolve(a).then(r => I(e, t, r, i, o))
    : Ia(a)
    ? Ha(e, o)
    : _a(a)
    ? Ba(e, a, i, o)
    : qt(a)
    ? Sa(e, t, a, i, o)
    : Ua(e, t, a, i, o)
}
function kt (e, t, a, i, o = {}) {
  let r = I(e, t, a, i, o)
  return st(r) ? r.render() : r
}
var Qe =
    typeof process == 'object' &&
    Object.prototype.toString.call(process) === '[object process]',
  ve
function qa () {
  var e, t, a
  return (
    (ve =
      ((a = class extends Response {
        constructor (o, r) {
          let n = o instanceof ReadableStream
          super(n ? null : o, r)
          k(this, e, void 0)
          k(this, t, void 0)
          j(this, e, n), j(this, t, o)
        }
        get body () {
          return u(this, t)
        }
        async text () {
          if (u(this, e) && Qe) {
            let o = new TextDecoder(),
              r = u(this, t),
              n = ''
            for await (let p of ut(r)) n += o.decode(p)
            return n
          }
          return super.text()
        }
        async arrayBuffer () {
          if (u(this, e) && Qe) {
            let o = u(this, t),
              r = [],
              n = 0
            for await (let l of ut(o)) r.push(l), (n += l.length)
            let p = new Uint8Array(n),
              c = 0
            for (let l of r) p.set(l, c), (c += l.length)
            return p
          }
          return super.arrayBuffer()
        }
      }),
      (e = new WeakMap()),
      (t = new WeakMap()),
      a)),
    ve
  )
}
var Va = Qe
    ? (e, t) =>
        typeof e == 'string' || ArrayBuffer.isView(e)
          ? new Response(e, t)
          : typeof ve > 'u'
          ? new (qa())(e, t)
          : new ve(e, t)
    : (e, t) => new Response(e, t),
  At = Symbol.for('astro.needsHeadRendering')
function Ja (e) {
  return At in e && !!e[At]
}
async function Et (e, t, a) {
  let i = new Y(),
    o = 0
  for await (let r of t)
    ot(r) &&
      o === 0 &&
      (o++,
      /<!doctype html/i.test(String(r)) ||
        (i.append(
          `<!DOCTYPE html>
`,
          e
        ),
        a && (await a(i)))),
      i.append(r, e)
  return i.toArrayBuffer()
}
async function Wa (e) {
  let t = e.propagators.values()
  for (;;) {
    let { value: a, done: i } = t.next()
    if (i) break
    let o = await a.init(e)
    $e(o) && e.extraHead.push(o.head)
  }
}
async function Ga (e, t, a, i, o, r) {
  var n, p
  if (!qt(t)) {
    e._metadata.headInTree =
      ((n = e.componentMetadata.get(t.moduleId)) == null
        ? void 0
        : n.containsHead) ?? !1
    let s = { ...(a ?? {}), 'server:root': !0 },
      d,
      m = ''
    try {
      if (Ja(t)) {
        let b = new Y()
        for await (let x of Fe(e)) b.append(x, e)
        m = b.toString()
      }
      let h = await I(e, t.name, t, s, null)
      st(h) ? (d = h.render()) : (d = h)
    } catch (h) {
      throw (w.is(h) && !h.loc && h.setLocation({ file: r?.component }), h)
    }
    let S = await Et(e, d, async h => {
      h.append(m, e)
    })
    return new Response(S, {
      headers: new Headers([
        ['Content-Type', 'text/html; charset=utf-8'],
        ['Content-Length', S.byteLength.toString()]
      ])
    })
  }
  e._metadata.headInTree =
    ((p = e.componentMetadata.get(t.moduleId)) == null
      ? void 0
      : p.containsHead) ?? !1
  let c = await t(e, a, i),
    l = $e(c)
  if (Bt(c) || l) {
    await Wa(e)
    let s = l ? c.content : c,
      d = Pe(s),
      m = e.response,
      S = new Headers(m.headers),
      h
    return (
      o
        ? (h = new ReadableStream({
            start (x) {
              async function C () {
                let g = 0
                try {
                  for await (let A of d) {
                    ot(A) &&
                      g === 0 &&
                      (/<!doctype html/i.test(String(A)) ||
                        x.enqueue(
                          pt.encode(`<!DOCTYPE html>
`)
                        ))
                    let P = ja(e, A)
                    x.enqueue(P), g++
                  }
                  x.close()
                } catch (A) {
                  w.is(A) && !A.loc && A.setLocation({ file: r?.component }),
                    x.error(A)
                }
              }
              C()
            }
          }))
        : ((h = await Et(e, d)),
          S.set('Content-Length', h.byteLength.toString())),
      Va(h, { ...m, headers: S })
    )
  }
  if (!(c instanceof Response))
    throw new w({
      ...f.OnlyResponseCanBeReturned,
      message: f.OnlyResponseCanBeReturned.message(r?.route, typeof c),
      location: { file: r?.component }
    })
  return c
}
function Ka (e, t, { class: a } = {}) {
  let i = ''
  a &&
    (typeof e.class < 'u'
      ? (e.class += ` ${a}`)
      : typeof e['class:list'] < 'u'
      ? (e['class:list'] = [e['class:list'], a])
      : (e.class = a))
  for (let [o, r] of Object.entries(e)) i += de(r, o, !0)
  return v(i)
}
var Ze,
  en,
  tn,
  nn,
  an = !0
typeof process < 'u' &&
  (({
    FORCE_COLOR: Ze,
    NODE_DISABLE_COLORS: en,
    NO_COLOR: tn,
    TERM: nn
  } = process.env || {}),
  (an = process.stdout && process.stdout.isTTY))
var Xa = {
  enabled:
    !en && tn == null && nn !== 'dumb' && ((Ze != null && Ze !== '0') || an)
}
function Z (e, t) {
  let a = new RegExp(`\\x1b\\[${t}m`, 'g'),
    i = `\x1B[${e}m`,
    o = `\x1B[${t}m`
  return function (r) {
    return !Xa.enabled || r == null
      ? r
      : i + (~('' + r).indexOf(o) ? r.replace(a, o + i) : r) + o
  }
}
var Ya = Z(0, 0),
  Ie = Z(1, 22),
  Qa = Z(2, 22),
  Za = Z(31, 39),
  jt = Z(33, 39),
  ei = Z(36, 39),
  Ct = {},
  ti = {
    get exports () {
      return Ct
    },
    set exports (e) {
      Ct = e
    }
  }
;(function (e) {
  var t = {}
  ;(e.exports = t),
    (t.eastAsianWidth = function (i) {
      var o = i.charCodeAt(0),
        r = i.length == 2 ? i.charCodeAt(1) : 0,
        n = o
      return (
        55296 <= o &&
          o <= 56319 &&
          56320 <= r &&
          r <= 57343 &&
          ((o &= 1023), (r &= 1023), (n = (o << 10) | r), (n += 65536)),
        n == 12288 || (65281 <= n && n <= 65376) || (65504 <= n && n <= 65510)
          ? 'F'
          : n == 8361 ||
            (65377 <= n && n <= 65470) ||
            (65474 <= n && n <= 65479) ||
            (65482 <= n && n <= 65487) ||
            (65490 <= n && n <= 65495) ||
            (65498 <= n && n <= 65500) ||
            (65512 <= n && n <= 65518)
          ? 'H'
          : (4352 <= n && n <= 4447) ||
            (4515 <= n && n <= 4519) ||
            (4602 <= n && n <= 4607) ||
            (9001 <= n && n <= 9002) ||
            (11904 <= n && n <= 11929) ||
            (11931 <= n && n <= 12019) ||
            (12032 <= n && n <= 12245) ||
            (12272 <= n && n <= 12283) ||
            (12289 <= n && n <= 12350) ||
            (12353 <= n && n <= 12438) ||
            (12441 <= n && n <= 12543) ||
            (12549 <= n && n <= 12589) ||
            (12593 <= n && n <= 12686) ||
            (12688 <= n && n <= 12730) ||
            (12736 <= n && n <= 12771) ||
            (12784 <= n && n <= 12830) ||
            (12832 <= n && n <= 12871) ||
            (12880 <= n && n <= 13054) ||
            (13056 <= n && n <= 19903) ||
            (19968 <= n && n <= 42124) ||
            (42128 <= n && n <= 42182) ||
            (43360 <= n && n <= 43388) ||
            (44032 <= n && n <= 55203) ||
            (55216 <= n && n <= 55238) ||
            (55243 <= n && n <= 55291) ||
            (63744 <= n && n <= 64255) ||
            (65040 <= n && n <= 65049) ||
            (65072 <= n && n <= 65106) ||
            (65108 <= n && n <= 65126) ||
            (65128 <= n && n <= 65131) ||
            (110592 <= n && n <= 110593) ||
            (127488 <= n && n <= 127490) ||
            (127504 <= n && n <= 127546) ||
            (127552 <= n && n <= 127560) ||
            (127568 <= n && n <= 127569) ||
            (131072 <= n && n <= 194367) ||
            (177984 <= n && n <= 196605) ||
            (196608 <= n && n <= 262141)
          ? 'W'
          : (32 <= n && n <= 126) ||
            (162 <= n && n <= 163) ||
            (165 <= n && n <= 166) ||
            n == 172 ||
            n == 175 ||
            (10214 <= n && n <= 10221) ||
            (10629 <= n && n <= 10630)
          ? 'Na'
          : n == 161 ||
            n == 164 ||
            (167 <= n && n <= 168) ||
            n == 170 ||
            (173 <= n && n <= 174) ||
            (176 <= n && n <= 180) ||
            (182 <= n && n <= 186) ||
            (188 <= n && n <= 191) ||
            n == 198 ||
            n == 208 ||
            (215 <= n && n <= 216) ||
            (222 <= n && n <= 225) ||
            n == 230 ||
            (232 <= n && n <= 234) ||
            (236 <= n && n <= 237) ||
            n == 240 ||
            (242 <= n && n <= 243) ||
            (247 <= n && n <= 250) ||
            n == 252 ||
            n == 254 ||
            n == 257 ||
            n == 273 ||
            n == 275 ||
            n == 283 ||
            (294 <= n && n <= 295) ||
            n == 299 ||
            (305 <= n && n <= 307) ||
            n == 312 ||
            (319 <= n && n <= 322) ||
            n == 324 ||
            (328 <= n && n <= 331) ||
            n == 333 ||
            (338 <= n && n <= 339) ||
            (358 <= n && n <= 359) ||
            n == 363 ||
            n == 462 ||
            n == 464 ||
            n == 466 ||
            n == 468 ||
            n == 470 ||
            n == 472 ||
            n == 474 ||
            n == 476 ||
            n == 593 ||
            n == 609 ||
            n == 708 ||
            n == 711 ||
            (713 <= n && n <= 715) ||
            n == 717 ||
            n == 720 ||
            (728 <= n && n <= 731) ||
            n == 733 ||
            n == 735 ||
            (768 <= n && n <= 879) ||
            (913 <= n && n <= 929) ||
            (931 <= n && n <= 937) ||
            (945 <= n && n <= 961) ||
            (963 <= n && n <= 969) ||
            n == 1025 ||
            (1040 <= n && n <= 1103) ||
            n == 1105 ||
            n == 8208 ||
            (8211 <= n && n <= 8214) ||
            (8216 <= n && n <= 8217) ||
            (8220 <= n && n <= 8221) ||
            (8224 <= n && n <= 8226) ||
            (8228 <= n && n <= 8231) ||
            n == 8240 ||
            (8242 <= n && n <= 8243) ||
            n == 8245 ||
            n == 8251 ||
            n == 8254 ||
            n == 8308 ||
            n == 8319 ||
            (8321 <= n && n <= 8324) ||
            n == 8364 ||
            n == 8451 ||
            n == 8453 ||
            n == 8457 ||
            n == 8467 ||
            n == 8470 ||
            (8481 <= n && n <= 8482) ||
            n == 8486 ||
            n == 8491 ||
            (8531 <= n && n <= 8532) ||
            (8539 <= n && n <= 8542) ||
            (8544 <= n && n <= 8555) ||
            (8560 <= n && n <= 8569) ||
            n == 8585 ||
            (8592 <= n && n <= 8601) ||
            (8632 <= n && n <= 8633) ||
            n == 8658 ||
            n == 8660 ||
            n == 8679 ||
            n == 8704 ||
            (8706 <= n && n <= 8707) ||
            (8711 <= n && n <= 8712) ||
            n == 8715 ||
            n == 8719 ||
            n == 8721 ||
            n == 8725 ||
            n == 8730 ||
            (8733 <= n && n <= 8736) ||
            n == 8739 ||
            n == 8741 ||
            (8743 <= n && n <= 8748) ||
            n == 8750 ||
            (8756 <= n && n <= 8759) ||
            (8764 <= n && n <= 8765) ||
            n == 8776 ||
            n == 8780 ||
            n == 8786 ||
            (8800 <= n && n <= 8801) ||
            (8804 <= n && n <= 8807) ||
            (8810 <= n && n <= 8811) ||
            (8814 <= n && n <= 8815) ||
            (8834 <= n && n <= 8835) ||
            (8838 <= n && n <= 8839) ||
            n == 8853 ||
            n == 8857 ||
            n == 8869 ||
            n == 8895 ||
            n == 8978 ||
            (9312 <= n && n <= 9449) ||
            (9451 <= n && n <= 9547) ||
            (9552 <= n && n <= 9587) ||
            (9600 <= n && n <= 9615) ||
            (9618 <= n && n <= 9621) ||
            (9632 <= n && n <= 9633) ||
            (9635 <= n && n <= 9641) ||
            (9650 <= n && n <= 9651) ||
            (9654 <= n && n <= 9655) ||
            (9660 <= n && n <= 9661) ||
            (9664 <= n && n <= 9665) ||
            (9670 <= n && n <= 9672) ||
            n == 9675 ||
            (9678 <= n && n <= 9681) ||
            (9698 <= n && n <= 9701) ||
            n == 9711 ||
            (9733 <= n && n <= 9734) ||
            n == 9737 ||
            (9742 <= n && n <= 9743) ||
            (9748 <= n && n <= 9749) ||
            n == 9756 ||
            n == 9758 ||
            n == 9792 ||
            n == 9794 ||
            (9824 <= n && n <= 9825) ||
            (9827 <= n && n <= 9829) ||
            (9831 <= n && n <= 9834) ||
            (9836 <= n && n <= 9837) ||
            n == 9839 ||
            (9886 <= n && n <= 9887) ||
            (9918 <= n && n <= 9919) ||
            (9924 <= n && n <= 9933) ||
            (9935 <= n && n <= 9953) ||
            n == 9955 ||
            (9960 <= n && n <= 9983) ||
            n == 10045 ||
            n == 10071 ||
            (10102 <= n && n <= 10111) ||
            (11093 <= n && n <= 11097) ||
            (12872 <= n && n <= 12879) ||
            (57344 <= n && n <= 63743) ||
            (65024 <= n && n <= 65039) ||
            n == 65533 ||
            (127232 <= n && n <= 127242) ||
            (127248 <= n && n <= 127277) ||
            (127280 <= n && n <= 127337) ||
            (127344 <= n && n <= 127386) ||
            (917760 <= n && n <= 917999) ||
            (983040 <= n && n <= 1048573) ||
            (1048576 <= n && n <= 1114109)
          ? 'A'
          : 'N'
      )
    }),
    (t.characterLength = function (i) {
      var o = this.eastAsianWidth(i)
      return o == 'F' || o == 'W' || o == 'A' ? 2 : 1
    })
  function a (i) {
    return i.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || []
  }
  ;(t.length = function (i) {
    for (var o = a(i), r = 0, n = 0; n < o.length; n++)
      r = r + this.characterLength(o[n])
    return r
  }),
    (t.slice = function (i, o, r) {
      ;(textLen = t.length(i)),
        (o = o || 0),
        (r = r || 1),
        o < 0 && (o = textLen + o),
        r < 0 && (r = textLen + r)
      for (var n = '', p = 0, c = a(i), l = 0; l < c.length; l++) {
        var s = c[l],
          d = t.length(s)
        if (p >= o - (d == 2 ? 1 : 0))
          if (p + d <= r) n += s
          else break
        p += d
      }
      return n
    })
})(ti)
var ni = new Intl.DateTimeFormat([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }),
  ye = { debug: 20, info: 30, warn: 40, error: 50, silent: 90 }
function on (e, t, a, i) {
  let o = e.level,
    r = e.dest,
    n = { type: a, level: t, message: i }
  ye[o] > ye[t] || r.write(n)
}
function V (e, t, a) {
  return on(e, 'warn', t, a)
}
function ai (e, t, a) {
  return on(e, 'error', t, a)
}
function ii (...e) {
  '_astroGlobalDebug' in globalThis && globalThis._astroGlobalDebug(...e)
}
if (typeof process < 'u') {
  let e = process
  'argv' in e &&
    Array.isArray(e.argv) &&
    (e.argv.includes('--verbose') || e.argv.includes('--silent'))
}
var oi = ['string', 'number', 'undefined']
function ri ([e, t], a) {
  if (!oi.includes(typeof t))
    throw new w({
      ...f.GetStaticPathsInvalidRouteParam,
      message: f.GetStaticPathsInvalidRouteParam.message(e, t, typeof t),
      location: { file: a }
    })
}
function si (e, { ssr: t, logging: a, route: i }) {
  if (
    (t &&
      e.getStaticPaths &&
      !e.prerender &&
      V(
        a,
        'getStaticPaths',
        'getStaticPaths() is ignored when "output: server" is set.'
      ),
    (!t || e.prerender) && !e.getStaticPaths)
  )
    throw new w({
      ...f.GetStaticPathsRequired,
      location: { file: i.component }
    })
}
function pi (e, t, a) {
  if (!Array.isArray(e))
    throw new w({
      ...f.InvalidGetStaticPathsReturn,
      message: f.InvalidGetStaticPathsReturn.message(typeof e),
      location: { file: a.component }
    })
  e.forEach(i => {
    if (
      i.params === void 0 ||
      i.params === null ||
      (i.params && Object.keys(i.params).length === 0)
    )
      throw new w({
        ...f.GetStaticPathsExpectedParams,
        location: { file: a.component }
      })
    if (typeof i.params != 'object')
      throw new w({
        ...f.InvalidGetStaticPathParam,
        message: f.InvalidGetStaticPathParam.message(typeof i.params),
        location: { file: a.component }
      })
    for (let [o, r] of Object.entries(i.params))
      typeof r > 'u' ||
        typeof r == 'string' ||
        typeof r == 'number' ||
        V(
          t,
          'getStaticPaths',
          `invalid path param: ${o}. A string, number or undefined value was expected, but got \`${JSON.stringify(
            r
          )}\`.`
        ),
        typeof r == 'string' &&
          r === '' &&
          V(
            t,
            'getStaticPaths',
            `invalid path param: ${o}. \`undefined\` expected for an optional param, but got empty string.`
          )
  })
}
function ci (e) {
  return a => {
    let i = {}
    return (
      e.forEach((o, r) => {
        o.startsWith('...')
          ? (i[o.slice(3)] = a[r + 1] ? decodeURIComponent(a[r + 1]) : void 0)
          : (i[o] = decodeURIComponent(a[r + 1]))
      }),
      i
    )
  }
}
function rn (e, t) {
  let a = Object.entries(e).reduce((i, o) => {
    ri(o, t)
    let [r, n] = o
    return (i[r] = n?.toString()), i
  }, {})
  return JSON.stringify(a, Object.keys(e).sort())
}
var Ft = Symbol.for('astro.clientAddress'),
  li = Symbol.for('astro.responseSent')
function di (e) {
  return function () {
    switch (e) {
      case 'Astro.redirect':
        throw new w(f.StaticRedirectNotAvailable)
    }
  }
}
function mi (e) {
  var t
  if (e && ((t = e.expressions) == null ? void 0 : t.length) === 1)
    return e.expressions[0]
}
var re,
  D,
  se,
  et = class {
    constructor (t, a, i) {
      k(this, re, void 0)
      k(this, D, void 0)
      k(this, se, void 0)
      if ((j(this, re, t), j(this, D, a), j(this, se, i), a))
        for (let o of Object.keys(a)) {
          if (this[o] !== void 0)
            throw new w({
              ...f.ReservedSlotName,
              message: f.ReservedSlotName.message(o)
            })
          Object.defineProperty(this, o, {
            get () {
              return !0
            },
            enumerable: !0
          })
        }
    }
    has (t) {
      return u(this, D) ? !!u(this, D)[t] : !1
    }
    async render (t, a = []) {
      if (!u(this, D) || !this.has(t)) return
      let i = u(this, re)
      if (!Array.isArray(a))
        V(
          u(this, se),
          'Astro.slots.render',
          `Expected second parameter to be an array, received a ${typeof a}. If you're trying to pass an array as a single argument and getting unexpected results, make sure you're passing your array as a item of an array. Ex: Astro.slots.render('default', [["Hello", "World"]])`
        )
      else if (a.length > 0) {
        let n = u(this, D)[t],
          p = typeof n == 'function' ? await n(i) : await n,
          c = mi(p)
        if (c)
          return await X(i, () => c(...a)).then(s =>
            s != null ? String(s) : s
          )
        if (typeof p == 'function')
          return await U(i, p(...a)).then(l => (l != null ? String(l) : l))
      }
      let o = await X(i, u(this, D)[t])
      return me(i, o)
    }
  }
;(re = new WeakMap()), (D = new WeakMap()), (se = new WeakMap())
var _e = null
function ui (e) {
  let {
      markdown: t,
      params: a,
      pathname: i,
      renderers: o,
      request: r,
      resolve: n
    } = e,
    p = new URL(r.url),
    c = new Headers()
  c.set('Content-Type', 'text/html')
  let l = { status: e.status, statusText: 'OK', headers: c }
  Object.defineProperty(l, 'headers', {
    value: l.headers,
    enumerable: !0,
    writable: !1
  })
  let s,
    d = e.componentMetadata ?? new Map(),
    m = {
      styles: e.styles ?? new Set(),
      scripts: e.scripts ?? new Set(),
      links: e.links ?? new Set(),
      componentMetadata: d,
      propagators: new Map(),
      extraHead: [],
      scope: 0,
      cookies: s,
      createAstro (S, h, b) {
        let x = new et(m, b, e.logging),
          C = {
            __proto__: S,
            get clientAddress () {
              if (!(Ft in r))
                throw e.adapterName
                  ? new w({
                      ...f.ClientAddressNotAvailable,
                      message: f.ClientAddressNotAvailable.message(
                        e.adapterName
                      )
                    })
                  : new w(f.StaticClientAddressNotAvailable)
              return Reflect.get(r, Ft)
            },
            get cookies () {
              return s || ((s = new he(r)), (m.cookies = s), s)
            },
            params: a,
            props: h,
            request: r,
            url: p,
            redirect: e.ssr
              ? (g, A) => {
                  if (r[li]) throw new w({ ...f.ResponseSentError })
                  return new Response(null, {
                    status: A || 302,
                    headers: { Location: g }
                  })
                }
              : di('Astro.redirect'),
            response: l,
            slots: x
          }
        return (
          Object.defineProperty(C, '__renderMarkdown', {
            enumerable: !1,
            writable: !1,
            value: async function (g, A) {
              if (typeof Deno < 'u')
                throw new Error('Markdown is not supported in Deno SSR')
              if (!_e) {
                let N = '@astrojs/'
                ;(N += 'markdown-remark'),
                  (_e = (await import(N)).renderMarkdown)
              }
              let { code: P } = await _e(g, { ...t, ...(A ?? {}) })
              return P
            }
          }),
          C
        )
      },
      resolve: n,
      _metadata: {
        renderers: o,
        pathname: i,
        hasHydrationScript: !1,
        hasRenderedHead: !1,
        hasDirectives: new Set(),
        headInTree: !1
      },
      response: l
    }
  return m
}
function fi (e) {
  return function (a, i = {}) {
    let { pageSize: o, params: r, props: n } = i,
      p = o || 10,
      c = 'page',
      l = r || {},
      s = n || {},
      d
    if (e.params.includes(`...${c}`)) d = !1
    else if (e.params.includes(`${c}`)) d = !0
    else
      throw new w({
        ...f.PageNumberParamNotFound,
        message: f.PageNumberParamNotFound.message(c)
      })
    let m = Math.max(1, Math.ceil(a.length / p))
    return [...Array(m).keys()].map(h => {
      let b = h + 1,
        x = p === 1 / 0 ? 0 : (b - 1) * p,
        C = Math.min(x + p, a.length),
        g = { ...l, [c]: d || b > 1 ? String(b) : void 0 },
        A = Ue(e.generate({ ...g })),
        P = b === m ? void 0 : Ue(e.generate({ ...g, page: String(b + 1) })),
        N =
          b === 1
            ? void 0
            : Ue(
                e.generate({
                  ...g,
                  page: !d && b - 1 === 1 ? void 0 : String(b - 1)
                })
              )
      return {
        params: g,
        props: {
          ...s,
          page: {
            data: a.slice(x, C),
            start: x,
            end: C - 1,
            size: p,
            total: a.length,
            currentPage: b,
            lastPage: m,
            url: { current: A, next: P, prev: N }
          }
        }
      }
    })
  }
}
function Ue (e) {
  return e === '' ? '/' : e
}
async function xi ({ isValidate: e, logging: t, mod: a, route: i, ssr: o }) {
  if ((si(a, { ssr: o, logging: t, route: i }), o && !a.prerender))
    return { staticPaths: Object.assign([], { keyed: new Map() }) }
  if (!a.getStaticPaths) throw new Error('Unexpected Error.')
  let r = []
  ;(r = await a.getStaticPaths({
    paginate: fi(i),
    rss () {
      throw new w(f.GetStaticPathsRemovedRSSHelper)
    }
  })),
    Array.isArray(r) && (r = r.flat()),
    e && pi(r, t, i)
  let n = r
  n.keyed = new Map()
  for (let p of n) {
    let c = rn(p.params, i.component)
    n.keyed.set(c, p)
  }
  return { staticPaths: n }
}
var tt = class {
  constructor (t, a = 'production') {
    ;(this.cache = {}), (this.logging = t), (this.mode = a)
  }
  clearAll () {
    this.cache = {}
  }
  set (t, a) {
    this.mode === 'production' &&
      this.cache[t.component] &&
      V(
        this.logging,
        'routeCache',
        `Internal Warning: route cache overwritten. (${t.component})`
      ),
      (this.cache[t.component] = a)
  }
  get (t) {
    return this.cache[t.component]
  }
}
function hi (e, t, a) {
  let i = rn(t, a.component),
    o = e.keyed.get(i)
  if (o) return o
  ii('findPathItemByKey', `Unexpected cache miss looking for ${i}`)
}
var sn = (e => ((e[(e.NoMatchingStaticPath = 0)] = 'NoMatchingStaticPath'), e))(
  sn || {}
)
async function pn (e) {
  let { logging: t, mod: a, route: i, routeCache: o, pathname: r, ssr: n } = e,
    p = {},
    c
  if (i && !i.pathname) {
    if (i.params.length) {
      let d = i.pattern.exec(decodeURIComponent(r))
      if (
        d &&
        ((p = ci(i.params)(d)), i.type === 'endpoint' && a.getStaticPaths)
      ) {
        let m = i.segments[i.segments.length - 1],
          S = Object.values(p),
          h = S[S.length - 1]
        if (m.length === 1 && m[0].dynamic && h === void 0)
          throw new w({
            ...f.PrerenderDynamicEndpointPathCollide,
            message: f.PrerenderDynamicEndpointPathCollide.message(i.route),
            hint: f.PrerenderDynamicEndpointPathCollide.hint(i.component),
            location: { file: i.component }
          })
      }
    }
    let l = o.get(i)
    l ||
      ((l = await xi({ mod: a, route: i, isValidate: !0, logging: t, ssr: n })),
      o.set(i, l))
    let s = hi(l.staticPaths, p, i)
    if (!s && (!n || a.prerender)) return 0
    c = s?.props ? { ...s.props } : {}
  } else c = {}
  return [p, c]
}
async function gi (e, t, a) {
  var i, o
  let r = await pn({
    logging: a.logging,
    mod: e,
    route: t.route,
    routeCache: a.routeCache,
    pathname: t.pathname,
    ssr: a.ssr
  })
  if (r === 0)
    throw new w({
      ...f.NoMatchingStaticPathFound,
      message: f.NoMatchingStaticPathFound.message(t.pathname),
      hint:
        (i = t.route) != null && i.component
          ? f.NoMatchingStaticPathFound.hint([
              (o = t.route) == null ? void 0 : o.component
            ])
          : ''
    })
  let [n, p] = r,
    c = e.default
  if (!c)
    throw new Error(
      `Expected an exported Astro component but received typeof ${typeof c}`
    )
  let l = ui({
    adapterName: a.adapterName,
    links: t.links,
    styles: t.styles,
    logging: a.logging,
    markdown: a.markdown,
    mode: a.mode,
    origin: t.origin,
    params: n,
    props: p,
    pathname: t.pathname,
    componentMetadata: t.componentMetadata,
    resolve: a.resolve,
    renderers: a.renderers,
    request: t.request,
    site: a.site,
    scripts: t.scripts,
    ssr: a.ssr,
    status: t.status ?? 200
  })
  typeof e.components == 'object' &&
    Object.assign(p, { components: e.components })
  let s = await Ga(l, c, p, null, a.streaming, t.route)
  return l.cookies && at(s, l.cookies), s
}
var $t = Symbol.for('astro.clientAddress')
function vi ({ request: e, params: t, site: a, props: i, adapterName: o }) {
  return {
    cookies: new he(e),
    request: e,
    params: t,
    site: a ? new URL(a) : void 0,
    generator: `Astro v${It}`,
    props: i,
    redirect (r, n) {
      return new Response(null, { status: n || 302, headers: { Location: r } })
    },
    url: new URL(e.url),
    get clientAddress () {
      if (!($t in e))
        throw o
          ? new w({
              ...f.ClientAddressNotAvailable,
              message: f.ClientAddressNotAvailable.message(o)
            })
          : new w(f.StaticClientAddressNotAvailable)
      return Reflect.get(e, $t)
    }
  }
}
async function yi (e, t, a, i) {
  var o, r
  let n = await pn({
    mod: e,
    route: a.route,
    routeCache: t.routeCache,
    pathname: a.pathname,
    logging: t.logging,
    ssr: t.ssr
  })
  if (n === sn.NoMatchingStaticPath)
    throw new w({
      ...f.NoMatchingStaticPathFound,
      message: f.NoMatchingStaticPathFound.message(a.pathname),
      hint:
        (o = a.route) != null && o.component
          ? f.NoMatchingStaticPathFound.hint([
              (r = a.route) == null ? void 0 : r.component
            ])
          : ''
    })
  let [p, c] = n,
    l = vi({
      request: a.request,
      params: p,
      props: c,
      site: t.site,
      adapterName: t.adapterName
    }),
    s = await qn(e, l, t.ssr)
  return s instanceof Response
    ? (at(s, l.cookies), { type: 'response', response: s })
    : (t.ssr &&
        !e.prerender &&
        (s.hasOwnProperty('headers') &&
          V(
            i,
            'ssr',
            'Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.'
          ),
        s.encoding &&
          V(
            i,
            'ssr',
            '`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.'
          )),
      {
        type: 'simple',
        body: s.body,
        encoding: s.encoding,
        cookies: l.cookies
      })
}
var Pt,
  Le = 1,
  bi = {
    write (e) {
      let t = console.error
      ye[e.level] < ye.error && (t = console.log)
      function a () {
        let r = '',
          n = e.type
        return (
          n &&
            ((r += Qa(ni.format(new Date()) + ' ')),
            e.level === 'info'
              ? (n = Ie(ei(`[${n}]`)))
              : e.level === 'warn'
              ? (n = Ie(jt(`[${n}]`)))
              : e.level === 'error' && (n = Ie(Za(`[${n}]`))),
            (r += `${n} `)),
          Ya(r)
        )
      }
      let i = e.message
      i === Pt ? (Le++, (i = `${i} ${jt(`(x${Le})`)}`)) : ((Pt = i), (Le = 1))
      let o = a() + i
      return t(o), !0
    }
  }
function wi (e) {
  return e[0] === '/' ? e : '/' + e
}
function Si (e) {
  return e.endsWith('/') ? e.slice(0, e.length - 1) : e
}
function ki (e) {
  return e.replace(/^\/|\/$/g, '')
}
function Ai (e) {
  return typeof e == 'string' || e instanceof String
}
function Rt (...e) {
  return e.filter(Ai).map(ki).join('/')
}
function Nt (e) {
  let t = e.request,
    a = new URL(t.url),
    i = e.origin ?? a.origin,
    o = e.pathname ?? a.pathname
  return { ...e, origin: i, pathname: o, url: a }
}
function Tt (e) {
  let t = /^\\\\\?\\/.test(e),
    a = /[^\u0000-\u0080]+/.test(e)
  return t || a ? e : e.replace(/\\/g, '/')
}
function lt (e, t, a) {
  return a ? Rt(a, Tt(e)) : t ? wi(Rt(t, Tt(e))) : e
}
function Ei (e, t, a) {
  return { props: { rel: 'stylesheet', href: lt(e, t, a) }, children: '' }
}
function ji (e, t, a) {
  return new Set(e.map(i => Ei(i, t, a)))
}
function Ci (e, t, a) {
  return e.type === 'external'
    ? Fi(e.value, t, a)
    : { props: { type: 'module' }, children: e.value }
}
function Fi (e, t, a) {
  return { props: { type: 'module', src: lt(e, t, a) }, children: '' }
}
function He (e, t) {
  return t.routes.find(a => a.pattern.test(decodeURI(e)))
}
function $i (e) {
  for (var t = [], a = 0; a < e.length; ) {
    var i = e[a]
    if (i === '*' || i === '+' || i === '?') {
      t.push({ type: 'MODIFIER', index: a, value: e[a++] })
      continue
    }
    if (i === '\\') {
      t.push({ type: 'ESCAPED_CHAR', index: a++, value: e[a++] })
      continue
    }
    if (i === '{') {
      t.push({ type: 'OPEN', index: a, value: e[a++] })
      continue
    }
    if (i === '}') {
      t.push({ type: 'CLOSE', index: a, value: e[a++] })
      continue
    }
    if (i === ':') {
      for (var o = '', r = a + 1; r < e.length; ) {
        var n = e.charCodeAt(r)
        if (
          (n >= 48 && n <= 57) ||
          (n >= 65 && n <= 90) ||
          (n >= 97 && n <= 122) ||
          n === 95
        ) {
          o += e[r++]
          continue
        }
        break
      }
      if (!o) throw new TypeError('Missing parameter name at '.concat(a))
      t.push({ type: 'NAME', index: a, value: o }), (a = r)
      continue
    }
    if (i === '(') {
      var p = 1,
        c = '',
        r = a + 1
      if (e[r] === '?')
        throw new TypeError('Pattern cannot start with "?" at '.concat(r))
      for (; r < e.length; ) {
        if (e[r] === '\\') {
          c += e[r++] + e[r++]
          continue
        }
        if (e[r] === ')') {
          if ((p--, p === 0)) {
            r++
            break
          }
        } else if (e[r] === '(' && (p++, e[r + 1] !== '?'))
          throw new TypeError('Capturing groups are not allowed at '.concat(r))
        c += e[r++]
      }
      if (p) throw new TypeError('Unbalanced pattern at '.concat(a))
      if (!c) throw new TypeError('Missing pattern at '.concat(a))
      t.push({ type: 'PATTERN', index: a, value: c }), (a = r)
      continue
    }
    t.push({ type: 'CHAR', index: a, value: e[a++] })
  }
  return t.push({ type: 'END', index: a, value: '' }), t
}
function Pi (e, t) {
  t === void 0 && (t = {})
  for (
    var a = $i(e),
      i = t.prefixes,
      o = i === void 0 ? './' : i,
      r = '[^'.concat(Ti(t.delimiter || '/#?'), ']+?'),
      n = [],
      p = 0,
      c = 0,
      l = '',
      s = function (O) {
        if (c < a.length && a[c].type === O) return a[c++].value
      },
      d = function (O) {
        var L = s(O)
        if (L !== void 0) return L
        var y = a[c],
          E = y.type,
          F = y.index
        throw new TypeError(
          'Unexpected '.concat(E, ' at ').concat(F, ', expected ').concat(O)
        )
      },
      m = function () {
        for (var O = '', L; (L = s('CHAR') || s('ESCAPED_CHAR')); ) O += L
        return O
      };
    c < a.length;

  ) {
    var S = s('CHAR'),
      h = s('NAME'),
      b = s('PATTERN')
    if (h || b) {
      var x = S || ''
      o.indexOf(x) === -1 && ((l += x), (x = '')),
        l && (n.push(l), (l = '')),
        n.push({
          name: h || p++,
          prefix: x,
          suffix: '',
          pattern: b || r,
          modifier: s('MODIFIER') || ''
        })
      continue
    }
    var C = S || s('ESCAPED_CHAR')
    if (C) {
      l += C
      continue
    }
    l && (n.push(l), (l = ''))
    var g = s('OPEN')
    if (g) {
      var x = m(),
        A = s('NAME') || '',
        P = s('PATTERN') || '',
        N = m()
      d('CLOSE'),
        n.push({
          name: A || (P ? p++ : ''),
          pattern: A && !P ? r : P,
          prefix: x,
          suffix: N,
          modifier: s('MODIFIER') || ''
        })
      continue
    }
    d('END')
  }
  return n
}
function Ri (e, t) {
  return Ni(Pi(e, t), t)
}
function Ni (e, t) {
  t === void 0 && (t = {})
  var a = Oi(t),
    i = t.encode,
    o =
      i === void 0
        ? function (c) {
            return c
          }
        : i,
    r = t.validate,
    n = r === void 0 ? !0 : r,
    p = e.map(function (c) {
      if (typeof c == 'object')
        return new RegExp('^(?:'.concat(c.pattern, ')$'), a)
    })
  return function (c) {
    for (var l = '', s = 0; s < e.length; s++) {
      var d = e[s]
      if (typeof d == 'string') {
        l += d
        continue
      }
      var m = c ? c[d.name] : void 0,
        S = d.modifier === '?' || d.modifier === '*',
        h = d.modifier === '*' || d.modifier === '+'
      if (Array.isArray(m)) {
        if (!h)
          throw new TypeError(
            'Expected "'.concat(d.name, '" to not repeat, but got an array')
          )
        if (m.length === 0) {
          if (S) continue
          throw new TypeError('Expected "'.concat(d.name, '" to not be empty'))
        }
        for (var b = 0; b < m.length; b++) {
          var x = o(m[b], d)
          if (n && !p[s].test(x))
            throw new TypeError(
              'Expected all "'
                .concat(d.name, '" to match "')
                .concat(d.pattern, '", but got "')
                .concat(x, '"')
            )
          l += d.prefix + x + d.suffix
        }
        continue
      }
      if (typeof m == 'string' || typeof m == 'number') {
        var x = o(String(m), d)
        if (n && !p[s].test(x))
          throw new TypeError(
            'Expected "'
              .concat(d.name, '" to match "')
              .concat(d.pattern, '", but got "')
              .concat(x, '"')
          )
        l += d.prefix + x + d.suffix
        continue
      }
      if (!S) {
        var C = h ? 'an array' : 'a string'
        throw new TypeError('Expected "'.concat(d.name, '" to be ').concat(C))
      }
    }
    return l
  }
}
function Ti (e) {
  return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}
function Oi (e) {
  return e && e.sensitive ? '' : 'i'
}
function zi (e, t) {
  let a = e
      .map(
        r =>
          '/' +
          r
            .map(n =>
              n.spread
                ? `:${n.content.slice(3)}(.*)?`
                : n.dynamic
                ? `:${n.content}`
                : n.content
                    .normalize()
                    .replace(/\?/g, '%3F')
                    .replace(/#/g, '%23')
                    .replace(/%5B/g, '[')
                    .replace(/%5D/g, ']')
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            )
            .join('')
      )
      .join(''),
    i = ''
  return t === 'always' && e.length && (i = '/'), Ri(a + i)
}
function Ot (e) {
  return {
    route: e.route,
    type: e.type,
    pattern: new RegExp(e.pattern),
    params: e.params,
    component: e.component,
    generate: zi(e.segments, e._meta.trailingSlash),
    pathname: e.pathname || void 0,
    segments: e.segments,
    prerender: e.prerender
  }
}
function cn (e) {
  let t = []
  for (let o of e.routes) {
    t.push({ ...o, routeData: Ot(o.routeData) })
    let r = o
    r.routeData = Ot(o.routeData)
  }
  let a = new Set(e.assets),
    i = new Map(e.componentMetadata)
  return { ...e, assets: a, componentMetadata: i, routes: t }
}
var Mi = Symbol.for('astro.responseSent'),
  W,
  T,
  H,
  pe,
  Se,
  B,
  G,
  ce,
  le,
  nt,
  ke,
  ln,
  be = class {
    constructor (t, a = !0) {
      k(this, le)
      k(this, ke)
      k(this, W, void 0)
      k(this, T, void 0)
      k(this, H, void 0)
      k(this, pe, void 0)
      k(this, Se, new TextEncoder())
      k(this, B, { dest: bi, level: 'info' })
      k(this, G, void 0)
      k(this, ce, void 0)
      j(this, T, t),
        j(this, H, { routes: t.routes.map(i => i.routeData) }),
        j(this, pe, new Map(t.routes.map(i => [i.routeData, i]))),
        j(this, W, {
          adapterName: t.adapterName,
          logging: u(this, B),
          markdown: t.markdown,
          mode: 'production',
          renderers: t.renderers,
          async resolve (i) {
            if (!(i in t.entryModules))
              throw new Error(`Unable to resolve [${i}]`)
            let o = t.entryModules[i]
            switch (!0) {
              case o.startsWith('data:'):
              case o.length === 0:
                return o
              default:
                return lt(o, t.base, t.assetsPrefix)
            }
          },
          routeCache: new tt(u(this, B)),
          site: u(this, T).site,
          ssr: !0,
          streaming: a
        }),
        j(this, G, u(this, T).base || '/'),
        j(this, ce, Si(u(this, G)))
    }
    removeBase (t) {
      return t.startsWith(u(this, G)) ? t.slice(u(this, ce).length + 1) : t
    }
    match (t, { matchNotFound: a = !1 } = {}) {
      let i = new URL(t.url)
      if (u(this, T).assets.has(i.pathname)) return
      let o = '/' + this.removeBase(i.pathname),
        r = He(o, u(this, H))
      if (r) return r.prerender ? void 0 : r
      if (a) {
        let n = He('/404', u(this, H))
        return n?.prerender ? void 0 : n
      } else return
    }
    async render (t, a) {
      let i = 200
      if (
        !a &&
        ((a = this.match(t)),
        a || ((i = 404), (a = this.match(t, { matchNotFound: !0 }))),
        !a)
      )
        return new Response(null, { status: 404, statusText: 'Not found' })
      a.route === '/404' && (i = 404)
      let o = u(this, T).pageMap.get(a.component)
      if (a.type === 'page') {
        let r = await z(this, le, nt).call(this, t, a, o, i)
        if (r.status === 500) {
          let n = He('/500', u(this, H))
          if (n) {
            o = u(this, T).pageMap.get(n.component)
            try {
              return await z(this, le, nt).call(this, t, n, o, 500)
            } catch {}
          }
        }
        return r
      } else {
        if (a.type === 'endpoint') return z(this, ke, ln).call(this, t, a, o, i)
        throw new Error(`Unsupported route type [${a.type}].`)
      }
    }
    setCookieHeaders (t) {
      return _n(t)
    }
  }
;(W = new WeakMap()),
  (T = new WeakMap()),
  (H = new WeakMap()),
  (pe = new WeakMap()),
  (Se = new WeakMap()),
  (B = new WeakMap()),
  (G = new WeakMap()),
  (ce = new WeakMap()),
  (le = new WeakSet()),
  (nt = async function (t, a, i, o = 200) {
    let r = new URL(t.url),
      n = '/' + this.removeBase(r.pathname),
      p = u(this, pe).get(a),
      c = ji(p.links),
      l = new Set()
    for (let s of p.scripts)
      'stage' in s
        ? s.stage === 'head-inline' &&
          l.add({ props: {}, children: s.children })
        : l.add(Ci(s))
    try {
      let s = Nt({
          request: t,
          origin: r.origin,
          pathname: n,
          componentMetadata: u(this, T).componentMetadata,
          scripts: l,
          links: c,
          route: a,
          status: o
        }),
        d = await gi(i, s, u(this, W))
      return Reflect.set(t, Mi, !0), d
    } catch (s) {
      return (
        ai(u(this, B), 'ssr', s.stack || s.message || String(s)),
        new Response(null, { status: 500, statusText: 'Internal server error' })
      )
    }
  }),
  (ke = new WeakSet()),
  (ln = async function (t, a, i, o = 200) {
    let r = new URL(t.url),
      n = '/' + this.removeBase(r.pathname),
      p = i,
      c = Nt({
        request: t,
        origin: r.origin,
        pathname: n,
        route: a,
        status: o
      }),
      l = await yi(p, u(this, W), c, u(this, B))
    if (l.type === 'response') {
      if (l.response.headers.get('X-Astro-Response') === 'Not-Found') {
        let s = new Request(new URL('/404', t.url)),
          d = this.match(s)
        if (d) return this.render(s, d)
      }
      return l.response
    } else {
      let s = l.body,
        d = new Headers(),
        m = An.getType(r.pathname)
      m
        ? d.set('Content-Type', `${m};charset=utf-8`)
        : d.set('Content-Type', 'text/plain;charset=utf-8')
      let S = u(this, Se).encode(s)
      d.set('Content-Length', S.byteLength.toString())
      let h = new Response(S, { status: 200, headers: d })
      return at(h, l.cookies), h
    }
  })
var dn = e => e.trim().replace(/[-_]([a-z])/g, (t, a) => a.toUpperCase())
async function Di (e, t, { default: a = null, ...i } = {}) {
  if (typeof e != 'function') return !1
  let o = {}
  for (let [r, n] of Object.entries(i)) {
    let p = dn(r)
    o[p] = n
  }
  try {
    return (await e({ ...t, ...o, children: a }))[Ce]
  } catch {}
  return !1
}
async function Ii (e, t = {}, { default: a = null, ...i } = {}) {
  let o = {}
  for (let [p, c] of Object.entries(i)) {
    let l = dn(p)
    o[l] = c
  }
  let { result: r } = this
  return { html: await U(r, Qn(e, { ...t, ...o, children: a })) }
}
var mn = { check: Di, renderToStaticMarkup: Ii }
var _i = je(),
  un = Ee(async (e, t, a) => {
    let i = e.createAstro(_i, t, a)
    i.self = un
    let { title: o } = i.props
    return Q`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${de(i.generator, 'content')}>
		<title>${o}</title>
	${Lt(e)}</head>
	<body>
		${Re(e, a.default)}
	</body></html>`
  }, '/Users/arpecop/Desktop/monext/apps/clown/src/layouts/Layout.astro'),
  Ui = je(),
  ue = Ee(async (e, t, a) => {
    let i = e.createAstro(Ui, t, a)
    i.self = ue
    let { href: o, title: r, body: n } = i.props
    return Q`${Fe(e)}<li class="link-card astro-DOHJNAO5">
	<a${de(o, 'href')} class="astro-DOHJNAO5">
		<h2 class="astro-DOHJNAO5">
			${r}
			<span class="astro-DOHJNAO5">&rarr;</span>
		</h2>
		<p class="astro-DOHJNAO5">
			${n}
		</p>
	</a>
</li>`
  }, '/Users/arpecop/Desktop/monext/apps/clown/src/components/Card.astro'),
  Li = je(),
  fn = Ee(async (e, t, a) => {
    let i = e.createAstro(Li, t, a)
    return (
      (i.self = fn),
      Q`${I(
        e,
        'Layout',
        un,
        { title: 'Welcome to Astro.', class: 'astro-J7PV25F6' },
        {
          default: o => Q`${Fe(o)}<main class="astro-J7PV25F6">
		<h1 class="astro-J7PV25F6">Welcome to <span class="text-gradient astro-J7PV25F6">Astro</span></h1>
		<p class="instructions astro-J7PV25F6">
			To get started, open the directory <code class="astro-J7PV25F6">src/pages</code> in your project.<br class="astro-J7PV25F6">
			<strong class="astro-J7PV25F6">Code Challenge:</strong> Tweak the "Welcome to Astro" message above.
		</p>
		<ul role="list" class="link-card-grid astro-J7PV25F6">
			${I(o, 'Card', ue, {
        href: 'https://docs.astro.build/',
        title: 'Documentation',
        body: 'Learn how Astro works and explore the official API docs.',
        class: 'astro-J7PV25F6'
      })}
			${I(o, 'Card', ue, {
        href: 'https://astro.build/integrations/',
        title: 'Integrations',
        body: 'Supercharge your project with new frameworks and libraries.',
        class: 'astro-J7PV25F6'
      })}
			${I(o, 'Card', ue, {
        href: 'https://astro.build/themes/',
        title: 'Themes',
        body: 'Explore a galaxy of community-built starter themes.',
        class: 'astro-J7PV25F6'
      })}
			${I(o, 'Card', ue, {
        href: 'https://astro.build/chat/',
        title: 'Community',
        body: 'Come say hi to our amazing Discord community. \u2764\uFE0F',
        class: 'astro-J7PV25F6'
      })}
		</ul>
	</main>`
        }
      )}`
    )
  }, '/Users/arpecop/Desktop/monext/apps/clown/src/pages/index.astro'),
  Hi = '/Users/arpecop/Desktop/monext/apps/clown/src/pages/index.astro',
  Bi = '',
  xn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, default: fn, file: Hi, url: Bi },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  )
var qi =
  typeof process == 'object' &&
  Object.prototype.toString.call(process) === '[object process]'
function Vi () {
  return new Proxy(
    {},
    {
      get: (e, t) => {
        console.warn(
          `Unable to access \`import.meta\0.env.${t.toString()}\` on initialization as the Cloudflare platform only provides the environment variables per request. Please move the environment variable access inside a function that's only called after a request has been received.`
        )
      }
    }
  )
}
qi || (process.env = Vi())
function vn (e) {
  let t = new be(e)
  return {
    onRequest: async ({ request: i, next: o, ...r }) => {
      process.env = r.env
      let { pathname: n } = new URL(i.url)
      if (e.assets.has(n)) return o(i)
      let p = t.match(i, { matchNotFound: !0 })
      if (p) {
        Reflect.set(
          i,
          Symbol.for('astro.clientAddress'),
          i.headers.get('cf-connecting-ip')
        ),
          Reflect.set(i, Symbol.for('runtime'), {
            ...r,
            name: 'cloudflare',
            next: o
          })
        let c = await t.render(i, p)
        if (t.setCookieHeaders)
          for (let l of t.setCookieHeaders(c)) c.headers.append('Set-Cookie', l)
        return c
      }
      return new Response(null, { status: 404, statusText: 'Not found' })
    }
  }
}
var hn = Object.freeze(
    Object.defineProperty(
      { __proto__: null, createExports: vn },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  Ji = new Map([['src/pages/index.astro', xn]]),
  Wi = [
    Object.assign(
      {
        name: 'astro:jsx',
        serverEntrypoint: 'astro/jsx/server.js',
        jsxImportSource: 'astro'
      },
      { ssr: mn }
    )
  ],
  yn = Object.assign(
    cn({
      adapterName: '@astrojs/cloudflare',
      routes: [
        {
          file: '',
          links: ['_astro/index.11c12019.css'],
          scripts: [],
          routeData: {
            route: '/',
            type: 'page',
            pattern: '^\\/$',
            segments: [],
            params: [],
            component: 'src/pages/index.astro',
            pathname: '/',
            prerender: !1,
            _meta: { trailingSlash: 'ignore' }
          }
        }
      ],
      base: '/',
      markdown: {
        drafts: !1,
        syntaxHighlight: 'shiki',
        shikiConfig: { langs: [], theme: 'github-dark', wrap: !1 },
        remarkPlugins: [],
        rehypePlugins: [],
        remarkRehype: {},
        gfm: !0,
        smartypants: !0
      },
      pageMap: null,
      propagation: [],
      renderers: [],
      entryModules: {
        '\0@astrojs-ssr-virtual-entry': '_@astrojs-ssr-virtual-entry.mjs',
        'astro:scripts/before-hydration.js': ''
      },
      assets: [
        '/_astro/index.11c12019.css',
        '/favicon.svg',
        '/$server_build/_astro/index.11c12019.css',
        '/$server_build/chunks/astro.e3a879a4.mjs',
        '/$server_build/chunks/pages/all.e2671c89.mjs'
      ]
    }),
    { pageMap: Ji, renderers: Wi }
  ),
  Gi = void 0,
  Ki = vn(yn),
  io = Ki.onRequest,
  gn = 'start'
gn in hn && hn[gn](yn, Gi)
export { io as onRequest, Ji as pageMap, Wi as renderers }
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
